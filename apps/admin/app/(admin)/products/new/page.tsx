import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { CATEGORIES } from '@/lib/catalog-store';
import { ProductForm } from '../product-form';
import { createProduct } from '../actions';

export const dynamic = 'force-dynamic';

export default async function NewProductPage({ searchParams }: { searchParams: { error?: string } }) {
  await requireAdmin();

  let categories: { slug: string; name: string }[] = CATEGORIES;
  try {
    const admin = createServiceRoleClient();
    const { data: dbCategories } = await admin.from('categories').select('slug, name').order('name');
    if (dbCategories && dbCategories.length > 0) {
      categories = dbCategories;
    }
  } catch (err) {
    // fallback to CATEGORIES
  }

  return (
    <div>
      <div className="toolbar" style={{ justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>
            <Link href="/products" style={{ fontWeight: 600 }}>← Back to Products Catalog</Link>
          </div>
          <h1 style={{ marginBottom: 0 }}>Create New Product</h1>
        </div>
      </div>

      <ProductForm categories={categories} action={createProduct} error={searchParams.error} />
    </div>
  );
}
