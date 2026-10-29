import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { getCachedProducts, saveProduct } from '@/lib/catalog-store';

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
      };
    }

    const productId = String(body.productId || body.id || '').trim();
    let status = String(body.status || '').trim();

    if (!productId) {
      return NextResponse.json({ success: false, error: 'Product ID is required.' }, { status: 400 });
    }

    // If status is not provided, toggle from current status
    const cached = getCachedProducts().find((p) => p.id === productId || p.slug === productId);
    if (!status) {
      status = cached?.status === 'published' ? 'draft' : 'published';
    }

    const inStock = status === 'published';

    // 1. Update in local catalog-store
    let updatedProduct;
    if (cached) {
      updatedProduct = saveProduct({
        ...cached,
        status: status as any,
      });
    } else {
      updatedProduct = saveProduct({
        id: productId,
        name: productId,
        status: status as any,
      });
    }

    // 2. Update in Supabase
    try {
      const admin = createServiceRoleClient();
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId);
      const updateData = {
        status,
        in_stock: inStock,
        updated_at: new Date().toISOString(),
      };
      const query = isUuid
        ? admin.from('products').update(updateData).eq('id', productId)
        : admin.from('products').update(updateData).eq('slug', productId);
      await query;
    } catch (err) {
      console.warn('[API toggle-visibility] Supabase update notice:', err);
    }

    try {
      revalidatePath('/products');
      revalidatePath(`/products/${productId}/edit`);
    } catch {}

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
