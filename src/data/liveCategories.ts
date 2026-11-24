import { useEffect, useState } from 'react';
import { CATEGORIES } from './categories';
import type { Product } from '../types';

/**
 * Sport disciplines as managed in the admin panel (Supabase `categories`).
 * They drive the shop filters and decide which disciplines are
 * "Enquire on WhatsApp" instead of "Add to bag". Until the network answers,
 * the last answer (localStorage) or the built-in list is used, so the first
 * paint never waits.
 */
export interface Discipline {
  id: string;
  name: string;
  /** Products in this discipline show "Enquire on WhatsApp" instead of Add to bag. */
  enquireWhatsapp: boolean;
}

/** What was hard-coded before the admin could decide: Gym & Strength is enquiry-only. */
const ENQUIRE_BY_DEFAULT = new Set(['gym-equipment']);
const CACHE_KEY = 'os_live_disciplines';
const EVENT = 'os_disciplines_updated';

const fallback = (): Discipline[] =>
  CATEGORIES.map((c) => ({ id: c.id, name: c.name, enquireWhatsapp: ENQUIRE_BY_DEFAULT.has(c.id) }));

let disciplines: Discipline[] = fallback();
let loadedFromDb = false;

try {
  const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(CACHE_KEY) : null;
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Array.isArray(parsed) && parsed.length > 0) {
      disciplines = parsed;
      loadedFromDb = true;
    }
  }
} catch {}

export async function fetchLiveDisciplines(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const url = import.meta.env.VITE_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';
    const res = await fetch(`${url}/rest/v1/categories?select=slug,name,sort_order,metadata&order=sort_order.asc,name.asc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return;
    const rows = await res.json();
    // An empty answer is never trusted as "every discipline was deleted".
    if (!Array.isArray(rows) || rows.length === 0) return;
    // Keep the long-standing site order first, then anything the admin added.
    const order = new Map(CATEGORIES.map((c, i) => [c.id as string, i]));
    const next: Discipline[] = rows
      .map((r: any) => ({
        id: String(r.slug),
        name: String(r.name || r.slug),
        enquireWhatsapp:
          typeof r.metadata?.enquire_whatsapp === 'boolean'
            ? r.metadata.enquire_whatsapp
            : ENQUIRE_BY_DEFAULT.has(String(r.slug)),
      }))
      .sort((a, b) => (order.get(a.id) ?? 999) - (order.get(b.id) ?? 999));
    if (JSON.stringify(next) === JSON.stringify(disciplines) && loadedFromDb) return;
    disciplines = next;
    loadedFromDb = true;
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(next)); } catch {}
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {}
}

if (typeof window !== 'undefined') {
  fetchLiveDisciplines();
  // Catalog edits and the 45 s catalog poll both emit this; disciplines ride along.
  window.addEventListener('os_catalog_updated', () => { fetchLiveDisciplines(); });
}

export function getDisciplines(): Discipline[] {
  return disciplines;
}

export function useDisciplines(): Discipline[] {
  const [list, setList] = useState<Discipline[]>(disciplines);
  useEffect(() => {
    const sync = () => setList(disciplines);
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  return list;
}

/** Discipline filters for a product list: the admin's disciplines plus any a product uses that the admin list lacks. */
export function disciplineFilters(list: Discipline[], products: Product[]): { id: string; name: string; count: number }[] {
  const counts = new Map<string, number>();
  const names = new Map<string, string>();
  for (const p of products) {
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    if (p.categoryName) names.set(p.category, p.categoryName);
  }
  const out = list.filter((d) => counts.has(d.id)).map((d) => ({ id: d.id, name: d.name, count: counts.get(d.id)! }));
  const known = new Set(list.map((d) => d.id));
  for (const [id, count] of counts) if (!known.has(id)) out.push({ id, name: names.get(id) || id, count });
  return out;
}

/**
 * Should this product show "Enquire on WhatsApp" instead of Add to bag?
 * Yes when ticked on the product itself, or when its discipline is set to
 * enquiry in the admin.
 */
export function shouldEnquireOnWhatsApp(product: Pick<Product, 'category' | 'enquireWhatsapp'>): boolean {
  if (product.enquireWhatsapp) return true;
  const d = disciplines.find((x) => x.id === product.category);
  return d ? d.enquireWhatsapp : ENQUIRE_BY_DEFAULT.has(product.category);
}
