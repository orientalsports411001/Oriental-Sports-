'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser Supabase client. Safe to use in client components — relies only on
 * the public URL + anon key. Used for the magic-link sign-in form; every
 * privileged admin read/write happens server-side via the service-role
 * client in lib/supabase/server.ts.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
  );
}
