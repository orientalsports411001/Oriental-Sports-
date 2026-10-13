import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 20;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; category?: string; page?: string };
}) {
  await requireAdmin();
  const admin = createServiceRoleClient();

  const page = Math.max(1, parseInt(searchParams.page || '1', 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = admin
    .from('products')
    .select('id, name, slug, category_slug, status, price, stock_quantity, low_stock_threshold', {
      count: 'exact',
    });

  if (searchParams.q) {
    query = query.ilike('name', `%${searchParams.q}%`);
  }
  if (searchParams.status) {
    query = query.eq('status', searchParams.status);
  }
  if (searchParams.category) {
    query = query.eq('category_slug', searchParams.category);
  }

  const { data: products, count } = await query.order('created_at', { ascending: false }).range(from, to);
  const { data: categories } = await admin.from('categories').select('slug, name').order('name');

  const totalPages = Math.max(1, Math.ceil((count || 0) / PAGE_SIZE));

  const buildPageHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (searchParams.q) params.set('q', searchParams.q);
    if (searchParams.status) params.set('status', searchParams.status);
    if (searchParams.category) params.set('category', searchParams.category);
    params.set('page', String(targetPage));
    return `?${params.toString()}`;
  };

  return (
    <div>
      <div className="toolbar">
        <h1 style={{ margin: 0, flex: 1 }}>Products</h1>
        <Link href="/products/new">
          <button>New product</button>
        </Link>
      </div>

      <form className="toolbar card" method="get">
        <input type="text" name="q" placeholder="Search by name" defaultValue={searchParams.q} />
        <select name="status" defaultValue={searchParams.status || ''}>
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        <select name="category" defaultValue={searchParams.category || ''}>
          <option value="">All categories</option>
          {(categories || []).map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit">Filter</button>
      </form>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {(products || []).map((p) => (
              <tr key={p.id}>
                <td>
                  <Link href={`/products/${p.id}/edit`}>{p.name}</Link>
                </td>
                <td>{p.category_slug}</td>
                <td>
                  <span className={`badge ${p.status}`}>{p.status}</span>
                </td>
                <td>₹{Number(p.price).toFixed(2)}</td>
                <td>
                  {p.stock_quantity}
                  {p.stock_quantity <= p.low_stock_threshold && (
                    <span className="badge draft" style={{ marginLeft: 6 }}>
                      low
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={5}>No products match these filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="toolbar" style={{ marginTop: 16 }}>
        <span>
          Page {page} of {totalPages} ({count ?? 0} products)
        </span>
        {page > 1 && (
          <Link href={buildPageHref(page - 1)}>
            <button className="secondary">Previous</button>
          </Link>
        )}
        {page < totalPages && (
          <Link href={buildPageHref(page + 1)}>
            <button className="secondary">Next</button>
          </Link>
        )}
      </div>
    </div>
  );
}
