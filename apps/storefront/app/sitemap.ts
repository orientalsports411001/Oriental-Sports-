import type { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/supabase/queries';
import { SITE_URL } from '@/lib/seo/constants';

type Sitemap = MetadataRoute.Sitemap;

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/shop', priority: 0.9, changeFrequency: 'daily' },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/visit', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/courts', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/shipping', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/returns', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<Sitemap> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const staticEntries: Sitemap = STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const categoryEntries: Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/shop/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // getProducts() already filters to status = 'published' (see
  // lib/supabase/queries.ts) — unpublished/draft products never appear here.
  const productEntries: Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
