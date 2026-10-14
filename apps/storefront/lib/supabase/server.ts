import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

/**
 * Server Supabase client for use in Server Components, Route Handlers and
 * Server Actions. Uses the cookie-based session so RLS policies apply as the
 * signed-in user (anon key only — never the service-role key here).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    // Falls back to placeholders when unset so routes still build/render
    // (queries.ts calls fail soft on the resulting network error) — see
    // apps/storefront/.env.example for the real values.
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321',
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      'placeholder-anon-key',
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
            // Middleware-based session refresh (if added later) handles this.
          }
        },
      },
    }
  );
}

/**
 * Service-role Supabase client — SERVER ONLY, never imported by client
 * components or exposed via any route that echoes the key back. Bypasses
 * RLS entirely; used only for: the seed script, and the Razorpay
 * verify/webhook route handlers that write order rows on the user's behalf
 * after independently verifying the payment signature.
 */
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set. Server-side order writes cannot proceed.');
  }

  return createSupabaseJsClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
