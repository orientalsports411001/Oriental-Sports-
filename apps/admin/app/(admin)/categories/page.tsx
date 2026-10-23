import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { CATEGORIES } from '@/lib/catalog-store';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  await requireAdmin();

  let categories: any[] = [];

  try {
    const admin = createServiceRoleClient();
    const { data: dbCategories } = await admin
      .from('categories')
      .select('id, slug, name, sort_order')
      .order('sort_order', { ascending: true });

    if (dbCategories && dbCategories.length > 0) {
      categories = dbCategories;
    }
  } catch (err) {
    // Supabase unreachable or empty
  }

  if (categories.length === 0) {
    categories = CATEGORIES.map((c, i) => ({
      id: `cat-${c.slug}`,
      slug: c.slug,
      name: c.name,
      sort_order: (i + 1) * 10,
    }));
  }

  return (
    <div style={{ maxWidth: 1420, margin: '0 auto' }}>
      {/* Clean Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--ink-heading)' }}>
              Sport Disciplines & Categories
            </h1>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.04em',
                padding: '2px 8px',
                borderRadius: 9999,
                background: 'var(--stone)',
                color: 'var(--subtle)',
              }}
            >
              {categories.length} Disciplines
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--muted)', fontWeight: 400 }}>
            Storefront sports hierarchy (Cricket, Tennis, Badminton, Football, Gym, Turnkey Courts).
          </p>
        </div>

        <Link href="/categories/new">
          <button
            style={{
              padding: '10px 22px',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.01em',
              borderRadius: 9999,
              background: 'var(--ink-heading)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(38,41,46,0.10)',
            }}
          >
            + Create Discipline
          </button>
        </Link>
      </div>

      {/* Clean Table Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '0 4px 24px -2px rgba(17,17,17,0.03)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ margin: 0, width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(17,17,17,0.06)' }}>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)' }}>
                  Sport / Discipline Name
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)' }}>
                  Storefront URL Slug
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)' }}>
                  Sort Priority
                </th>
                <th style={{ textAlign: 'right', padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(17,17,17,0.04)' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link
                      href={`/categories/${c.id}/edit`}
                      style={{ fontWeight: 800, fontSize: 14, color: 'var(--ink)', textDecoration: 'none' }}
                    >
                      {c.name}
                    </Link>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontSize: 12, padding: '3px 8px', borderRadius: 4, background: 'var(--stone)', color: 'var(--subtle)', fontFamily: 'monospace' }}>
                      /category/{c.slug}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--muted)', fontWeight: 700, fontSize: 13 }}>
                    {c.sort_order ?? 0}
                  </td>
                  <td style={{ textAlign: 'right', padding: '16px 20px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
                      <Link
                        href={`/categories/${c.id}/edit`}
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: 'var(--ink)',
                          textDecoration: 'none',
                        }}
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/products?category=${c.slug}`}
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: 'var(--subtle)',
                          textDecoration: 'none',
                        }}
                      >
                        Filter Products →
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
