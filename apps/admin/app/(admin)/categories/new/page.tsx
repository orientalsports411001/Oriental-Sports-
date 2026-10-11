import { requireAdmin } from '@/lib/require-admin';
import { CategoryForm } from '../category-form';
import { createCategory } from '../actions';

export const dynamic = 'force-dynamic';

export default async function NewCategoryPage({ searchParams }: { searchParams: { error?: string } }) {
  await requireAdmin();

  return (
    <div>
      <h1>New category</h1>
      <div className="card">
        <CategoryForm action={createCategory} error={searchParams.error} />
      </div>
    </div>
  );
}
