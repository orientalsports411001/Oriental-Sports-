import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { CATEGORIES } from '@/lib/catalog-store';
import { getBrands, DEFAULT_BRANDS } from '@/lib/brands';
import { ProductForm } from '../product-form';
import { createProduct } from '../actions';

export const dynamic = 'force-dynamic';

/** Gym & Strength was enquiry-only before this setting existed, so it counts as ticked until the admin saves the discipline. */
const withEnquireFlag = (list: any[]) =>
  list.map((c) => ({
    slug: c.slug,
    name: c.name,
    enquire_whatsapp: c.metadata?.enquire_whatsapp ?? c.slug === 'gym-equipment',
  }));

export default async function NewProductPage({ searchParams }: { searchParams: { error?: string } }) {
  await requireAdmin();

  let categories: any[] = withEnquireFlag(CATEGORIES);
  try {
    const admin = createServiceRoleClient();
    const { data: dbCategories } = await admin.from('categories').select('slug, name, metadata').order('name');
    if (dbCategories && dbCategories.length > 0) {
      categories = withEnquireFlag(dbCategories);
    }
  } catch (err) {
    // fallback to CATEGORIES
  }

  const brands = await getBrands().catch(() => DEFAULT_BRANDS);

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

      <ProductForm categories={categories} brands={brands} action={createProduct} error={searchParams.error} />
    </div>
  );
}
