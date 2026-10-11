import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Server Supabase client for use in Server Components, Route Handlers and
 * Server Actions. Uses the cookie-based session (anon key only) — this is
 * how every admin page determines *who* is signed in and checks their
 * `profiles.role` before rendering anything.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component where cookies can't be set.
          }
        },
      },
    }
  );
}

/**
 * Service-role Supabase client — SERVER ONLY. Bypasses RLS entirely. This is
 * the admin app's primary data-access path: every product/category/order/
 * inventory read and write goes through this client (so drafts/archived
 * products and all orders are visible), gated beforehand by the server-side
 * role check in app/(admin)/layout.tsx (or equivalent per-route check).
 */
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set. Admin data access cannot proceed.');
  }

  return createSupabaseJsClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
