import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  await requireAdmin();
  const admin = createServiceRoleClient();
  const { data: categories } = await admin
    .from('categories')
    .select('id, slug, name, sort_order')
    .order('sort_order', { ascending: true });

  return (
    <div>
      <div className="toolbar">
        <h1 style={{ margin: 0, flex: 1 }}>Categories</h1>
        <a href="/categories/new">
          <button>New category</button>
        </a>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Sort order</th>
            </tr>
          </thead>
          <tbody>
            {(categories || []).map((c) => (
              <tr key={c.id}>
                <td>
                  <a href={`/categories/${c.id}/edit`}>{c.name}</a>
                </td>
                <td>{c.slug}</td>
                <td>{c.sort_order}</td>
              </tr>
            ))}
            {(!categories || categories.length === 0) && (
              <tr>
                <td colSpan={3}>No categories yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
