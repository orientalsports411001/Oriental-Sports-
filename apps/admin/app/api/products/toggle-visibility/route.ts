import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { revalidateAdminNav } from '@/lib/nav-counts';
import { getCachedProducts, saveProduct } from '@/lib/catalog-store';
import { broadcastRealtimeEvent } from '@/lib/supabase/broadcast';

export async function POST(req: Request) {
  try {
    let body: any = {};
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else if (contentType.includes('form')) {
      const formData = await req.formData();
      body = {
        productId: formData.get('productId') || formData.get('id'),
        status: formData.get('status'),
        stockQuantity: formData.get('stockQuantity') || formData.get('stock_quantity'),
      };
    }

    const productId = String(body.productId || body.id || '').trim();
    let status = String(body.status || '').trim();
    const newStock = body.stockQuantity !== undefined ? Number(body.stockQuantity) : undefined;

    if (!productId) {
      return NextResponse.json({ success: false, error: 'Product ID is required.' }, { status: 400 });
    }

    // If status is not provided, toggle from current status
    const cached = getCachedProducts().find((p) => p.id === productId || p.slug === productId);
    if (!status) {
      status = cached?.status === 'published' ? 'draft' : 'published';
    }

    const inStock = status === 'published';
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId);
    const targetSlug = cached?.slug || (!isUuid ? productId : undefined);
    const updatedProduct = cached
      ? { ...cached, status, ...(newStock !== undefined ? { stock_quantity: newStock } : {}) }
      : { id: productId, status, ...(newStock !== undefined ? { stock_quantity: newStock } : {}) };

    // Update in Supabase (SDK -> REST fallback)
    let updatedInSupabase = false;
    try {
      const admin = createServiceRoleClient();
      const { data: existing } = await (isUuid
        ? admin.from('products').select('id, metadata').eq('id', productId).maybeSingle()
        : admin.from('products').select('id, metadata').eq('slug', targetSlug || productId).maybeSingle());

      if (existing) {
        const updatedMetadata = {
          ...(existing.metadata || {}),
          status,
          ...(newStock !== undefined ? { stock_quantity: newStock } : {}),
        };
        const { error } = await admin
          .from('products')
          .update({
            in_stock: inStock && (newStock === undefined || newStock > 0),
            metadata: updatedMetadata,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
        if (!error) updatedInSupabase = true;
      }
    } catch (err) {
      console.warn('[API toggle-visibility] Supabase SDK notice:', err);
    }

    if (!updatedInSupabase) {
      try {
        const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
        const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';
        const headers = {
          apikey: supaKey,
          Authorization: `Bearer ${supaKey}`,
          'Content-Type': 'application/json',
        };
        const filter = isUuid
          ? `id=eq.${encodeURIComponent(productId)}`
          : `slug=eq.${encodeURIComponent(targetSlug || productId)}`;
        const lookup = await fetch(`${supaUrl}/rest/v1/products?${filter}&select=id,metadata&limit=1`, {
          headers,
          cache: 'no-store',
        });
        const rows = lookup.ok ? await lookup.json() : [];
        if (Array.isArray(rows) && rows[0]?.id) {
          const updatedMetadata = {
            ...(rows[0].metadata || {}),
            status,
            ...(newStock !== undefined ? { stock_quantity: newStock } : {}),
          };
          await fetch(`${supaUrl}/rest/v1/products?id=eq.${encodeURIComponent(rows[0].id)}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
              in_stock: inStock && (newStock === undefined || newStock > 0),
              metadata: updatedMetadata,
              updated_at: new Date().toISOString(),
            }),
          });
        } else if (cached) {
          await fetch(`${supaUrl}/rest/v1/products`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              name: cached.name,
              slug: cached.slug,
              category_slug: cached.category_slug || 'accessories',
              brand: cached.brand || 'Oriental Sports',
              description: cached.description || '',
              price: Number(cached.price || 0),
              compare_at_price: cached.compare_at_price ?? null,
              images: cached.images || [],
              in_stock: inStock && (newStock === undefined || newStock > 0),
              metadata: {
                status,
                stock_quantity: Number(newStock ?? cached.stock_quantity ?? 10),
                low_stock_threshold: Number(cached.low_stock_threshold ?? 5),
              },
            }),
          });
        }
      } catch {}
    }

    try {
      revalidateAdminNav();
      revalidatePath('/products');
      revalidatePath(`/products/${productId}/edit`);
    } catch {}

    // 3. Broadcast realtime event on oriental_sports_sync
    await broadcastRealtimeEvent('product_updated', {
      product: updatedProduct,
      productId,
      status,
      stock_quantity: newStock,
    });

    return NextResponse.json({
      success: true,
      productId,
      status,
      product: updatedProduct,
    });
  } catch (err: any) {
    console.error('API /api/products/toggle-visibility error:', err);
    return NextResponse.json({ success: false, error: err?.message || 'Failed to toggle visibility.' }, { status: 500 });
  }
}
