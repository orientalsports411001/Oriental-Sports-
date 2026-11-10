import { NextResponse } from 'next/server';
import { getCachedOrdersAsync } from '@/lib/catalog-store';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { checkAdmin } from '@/lib/require-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
};

export async function GET() {
  const admin = await checkAdmin();
  if (!admin.ok) {
    return NextResponse.json(
      { success: false, error: admin.error },
      { status: admin.reason === 'forbidden' ? 403 : 401, headers: noStoreHeaders }
    );
  }

  try {
    let latest: any = null;

    // 1. Check local catalog cache first (fastest)
    const cached = await getCachedOrdersAsync();
    if (cached.length > 0) {
      const sorted = [...cached].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      latest = sorted[0];
    }

    // 2. Check Supabase orders if available
    try {
      const admin = createServiceRoleClient();
      const { data: dbLatest } = await admin
        .from('orders')
        // orders has no customer_name column (name lives in shipping_address);
        // selecting it made this whole query fail silently.
        .select('id, order_number, total_amount, status, created_at, shipping_address')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (dbLatest) {
        if (!latest || new Date(dbLatest.created_at).getTime() > new Date(latest.created_at).getTime()) {
          latest = dbLatest;
        }
      }
    } catch {}

    if (!latest) {
      return NextResponse.json({ success: true, latestOrder: null, totalOrders: 0 }, { headers: noStoreHeaders });
    }

    return NextResponse.json(
      {
        success: true,
        totalOrders: cached.length,
        latestOrder: {
          id: latest.id,
          order_number: latest.order_number,
          customer_name:
            latest.customer_name ||
            (latest.shipping_address as any)?.name ||
            (latest.shipping_address as any)?.fullName ||
            'Customer',
          customer_phone:
            latest.customer_phone ||
            (latest.shipping_address as any)?.phone ||
            '',
          total_amount: Number(latest.total_amount || 0),
          status: latest.status || 'confirmed',
          created_at: latest.created_at || new Date().toISOString(),
        },
      },
      { headers: noStoreHeaders }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to fetch latest order' },
      { status: 500, headers: noStoreHeaders }
    );
  }
}

