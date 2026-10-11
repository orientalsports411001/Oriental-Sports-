'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser Supabase client. Safe to use in client components — relies only on
 * the public URL + anon key, which are exposed to the browser by design and
 * are constrained entirely by Postgres RLS policies (see supabase/migrations).
 */
export function createClient() {
  // Fallback placeholders let `next build`'s static-render pass (which
  // instantiates every client component once on the server, including
  // AuthProvider) succeed without real credentials configured yet. Any
  // actual call against these placeholder values will fail at the network
  // layer — see apps/storefront/.env.example for the real values to set in
  // .env.local before running the app for real.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
  );
}
