import { NextRequest, NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { revalidateAdminNav } from '@/lib/nav-counts';

// Enforce max duration for Edge/Serverless Cron
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

interface SyncAuditReport {
  timestamp: string;
  durationMs: number;
  totalProductsAudited: number;
  inconsistenciesFound: number;
  inconsistenciesResolved: number;
  duplicatesFound: number;
  duplicatesFlagged: string[];
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
  details: string[];
}

export async function GET(req: NextRequest) {
  const startTime = Date.now();
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const isVercelCron = req.headers.get('user-agent')?.includes('vercel-cron');

  // Verify CRON_SECRET if configured, unless running in standard dev or verified Vercel cron
  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && !isVercelCron) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid or missing CRON_SECRET token' },
      { status: 401 }
    );
  }

  const report: SyncAuditReport = {
    timestamp: new Date().toISOString(),
    durationMs: 0,
    totalProductsAudited: 0,
    inconsistenciesFound: 0,
    inconsistenciesResolved: 0,
    duplicatesFound: 0,
    duplicatesFlagged: [],
    status: 'SUCCESS',
    details: [],
  };

  try {
    const admin = createServiceRoleClient();

    // 1. Fetch all products from authoritative Supabase DB
    const { data: products, error } = await admin
      .from('products')
      .select('id, slug, name, in_stock, metadata, created_at, updated_at');

    if (error) {
      throw new Error(`Supabase query failed: ${error.message}`);
    }

    if (!products || products.length === 0) {
      report.details.push('No products found in database to audit.');
      report.durationMs = Date.now() - startTime;
      return NextResponse.json(report);
    }

    report.totalProductsAudited = products.length;

    // 2. Detect duplicate slugs
    const slugMap = new Map<string, string[]>();
    for (const p of products) {
      if (!p.slug) continue;
      const list = slugMap.get(p.slug) || [];
      list.push(p.id);
      slugMap.set(p.slug, list);
    }

    for (const [slug, ids] of slugMap.entries()) {
      if (ids.length > 1) {
        report.duplicatesFound += ids.length - 1;
        report.duplicatesFlagged.push(`Slug "${slug}" shared by IDs: ${ids.join(', ')}`);
      }
    }

    // 3. Audit stock and visibility consistency
    const updatePromises: PromiseLike<any>[] = [];

    for (const p of products) {
      const meta = (p.metadata as Record<string, any>) || {};
      const stockQuantity = Number(meta.stock_quantity ?? (p.in_stock ? 10 : 0));
      const status = meta.status || (p.in_stock ? 'published' : 'draft');
      const expectedInStock = status === 'published' && stockQuantity > 0;

      // Inconsistency check: in_stock column disagrees with stock_quantity or status
      if (p.in_stock !== expectedInStock) {
        report.inconsistenciesFound++;
        report.details.push(
          `Product "${p.name || p.slug}" (${p.id}): in_stock was ${p.in_stock}, expected ${expectedInStock} (stock: ${stockQuantity}, status: ${status})`
        );

        // Update database record to restore consistency
        const updatedMetadata = {
          ...meta,
          status,
          stock_quantity: stockQuantity,
          low_stock_threshold: Number(meta.low_stock_threshold ?? 5),
        };

        const updateOp = admin
          .from('products')
          .update({
            in_stock: expectedInStock,
            metadata: updatedMetadata,
            updated_at: new Date().toISOString(),
          })
          .eq('id', p.id);

        updatePromises.push(updateOp);
      }
    }

    const results = await Promise.all(updatePromises);
    for (const res of results) {
      if (res && !res.error) {
        report.inconsistenciesResolved++;
      } else if (res?.error) {
        report.details.push(`Failed to repair product: ${res.error.message}`);
      }
    }

    // 4. Revalidate frontend paths if changes were resolved
    if (report.inconsistenciesResolved > 0) {
      try {
        revalidateAdminNav();
        revalidatePath('/dashboard');
      } catch (revErr) {
        report.details.push(`Revalidation notice: ${String(revErr)}`);
      }
    }

    report.status = report.inconsistenciesFound === report.inconsistenciesResolved ? 'SUCCESS' : 'PARTIAL';
    report.durationMs = Date.now() - startTime;

    console.log(`[Cron Sync Catalog] Audit finished in ${report.durationMs}ms:`, {
      audited: report.totalProductsAudited,
      inconsistencies: report.inconsistenciesFound,
      resolved: report.inconsistenciesResolved,
      duplicates: report.duplicatesFound,
    });

    return NextResponse.json(report, { status: 200 });
  } catch (err: any) {
    report.status = 'FAILED';
    report.durationMs = Date.now() - startTime;
    report.details.push(`Fatal cron execution error: ${err.message || String(err)}`);
    console.error('[Cron Sync Catalog Error]:', err);

    return NextResponse.json(report, { status: 500 });
  }
}
