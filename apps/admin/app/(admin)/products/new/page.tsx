import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { ProductForm } from '../product-form';
import { createProduct } from '../actions';

export const dynamic = 'force-dynamic';

export default async function NewProductPage({ searchParams }: { searchParams: { error?: string } }) {
  await requireAdmin();
  const admin = createServiceRoleClient();
  const { data: categories } = await admin.from('categories').select('slug, name').order('name');

  return (
    <div>
      <h1>New product</h1>
      <div className="card">
        <ProductForm categories={categories || []} action={createProduct} error={searchParams.error} />
      </div>
    </div>
  );
}
