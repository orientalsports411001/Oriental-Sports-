import { fetchCloudJson, uploadCloudJson } from './cloud-storage';
import { getLiveSupabaseProducts } from './catalog-store';

/**
 * Brand tags for the product form. A brand added with "New brand" is saved in
 * a small cloud JSON list (same store the admin already uses for orders), so
 * it is offered on every later product even before any product uses it.
 */
const BRANDS_BLOB_ID = 'os_admin_brands';

export const DEFAULT_BRANDS = ['SG', 'Yonex', 'Li-Ning', 'Nivia', 'Cosco', 'Oriental Pro', 'Oriental Infrastructure'];

export function cleanBrand(input: unknown): string {
  return String(input ?? '').replace(/\s+/g, ' ').trim().slice(0, 40);
}

const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');

async function readSaved(exact: boolean): Promise<string[]> {
  const data = await fetchCloudJson<string[]>(BRANDS_BLOB_ID, { exact });
  return Array.isArray(data) ? data.map(cleanBrand).filter(Boolean) : [];
}

function mergeUnique(...lists: string[][]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const list of lists) {
    for (const raw of list) {
      const b = cleanBrand(raw);
      const k = key(b);
      if (!b || !k || seen.has(k)) continue;
      seen.add(k);
      out.push(b);
    }
  }
  return out;
}

/** Brands already on products, spelled the way most of them spell it ("Cougar", not "cougar "), A to Z. */
function brandsInUse(rows: any[]): string[] {
  const groups = new Map<string, Map<string, number>>();
  for (const r of rows) {
    const b = cleanBrand(r?.brand);
    const k = key(b);
    if (!b || !k) continue;
    const spellings = groups.get(k) ?? new Map<string, number>();
    spellings.set(b, (spellings.get(b) ?? 0) + 1);
    groups.set(k, spellings);
  }
  return Array.from(groups.values())
    .map((spellings) => Array.from(spellings.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0])
    .sort((a, b) => a.localeCompare(b));
}

/** Defaults, then saved brands, then brands already used by products. */
export async function getBrands(): Promise<string[]> {
  const [saved, rows] = await Promise.all([readSaved(true), getLiveSupabaseProducts().catch(() => [] as any[])]);
  return mergeUnique(DEFAULT_BRANDS, saved, brandsInUse(rows || []));
}

export async function addBrand(name: unknown): Promise<{ ok: true; brand: string; added: boolean; brands: string[] } | { ok: false; error: string }> {
  const brand = cleanBrand(name);
  if (brand.length < 2) return { ok: false, error: 'Brand name must be at least 2 characters.' };

  const saved = await readSaved(true);
  const existing = mergeUnique(DEFAULT_BRANDS, saved).find((b) => key(b) === key(brand));
  if (existing) return { ok: true, brand: existing, added: false, brands: await getBrands() };

  const ok = await uploadCloudJson(BRANDS_BLOB_ID, [...saved, brand]);
  if (!ok) return { ok: false, error: 'Could not save the brand. Please try again.' };
  return { ok: true, brand, added: true, brands: mergeUnique(await getBrands(), [brand]) };
}
