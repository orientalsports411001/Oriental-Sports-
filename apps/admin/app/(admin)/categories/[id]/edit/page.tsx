import { notFound } from 'next/navigation';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { CategoryForm } from '../../category-form';
import { updateCategory } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function EditCategoryPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string; saved?: string };
}) {
  await requireAdmin();
  const admin = createServiceRoleClient();
  const { data: category } = await admin.from('categories').select('*').eq('id', params.id).maybeSingle();

  if (!category) notFound();

  const boundUpdate = updateCategory.bind(null, params.id);

  return (
    <div>
      <h1>Edit category</h1>
      {searchParams.saved && <p className="success">Saved.</p>}
      <div className="card">
        <CategoryForm category={category} action={boundUpdate} error={searchParams.error} />
      </div>
    </div>
  );
}
