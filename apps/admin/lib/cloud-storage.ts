import crypto from 'node:crypto';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'kvdrimse';

function credentials() {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiKey || !apiSecret) {
    throw new Error('CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set.');
  }
  return { apiKey, apiSecret };
}

/**
 * Freshness rules (all measured against this Cloudinary account):
 * - Unversioned raw URLs are served with `max-age=2592000` (30 days) and the
 *   CDN ignores `?t=` cache-busters, so without invalidation an overwritten
 *   blob kept being served for weeks — orders "never arrived" and status
 *   changes "reverted".
 * - Uploading with `invalidate=true` makes the unversioned URL fresh within
 *   ~3–10 s. Good enough for page reads and polling.
 * - `/v<version>/` URLs are always exact. The current version comes either
 *   from our own last upload (same instance) or the Admin API, which is
 *   rate-limited (500/hour) — so it's only used for `exact` reads, i.e.
 *   right before a read-modify-write, where a stale view would erase orders.
 */
const OWN_WRITE_TTL_MS = 15000;
const EXACT_TTL_MS = 2000;
const versionMemo = new Map<string, { version: number; at: number }>();
let adminApiBackoffUntil = 0;

function basicAuth() {
  const { apiKey, apiSecret } = credentials();
  return 'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
}

async function exactVersion(publicId: string): Promise<number | null> {
  const memo = versionMemo.get(publicId);
  if (memo && Date.now() - memo.at < EXACT_TTL_MS) return memo.version;
  if (Date.now() < adminApiBackoffUntil) return null;

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/raw/upload/${encodeURIComponent(publicId)}`,
      { headers: { Authorization: basicAuth() }, cache: 'no-store' }
    );
    if (res.status === 420 || res.status === 429) {
      adminApiBackoffUntil = Date.now() + 60_000;
      console.warn('[cloud-storage] Admin API rate-limited; falling back to CDN reads for 60s');
      return null;
    }
    if (!res.ok) return null;
    const info = await res.json();
    if (typeof info?.version === 'number') {
      versionMemo.set(publicId, { version: info.version, at: Date.now() });
      return info.version;
    }
  } catch {}
  return null;
}

/**
 * Persists JSON data into Cloudinary Raw Storage as a resilient cloud-backed store.
 * Ensures orders and new products persist across independent serverless lambdas on Vercel.
 */
export async function uploadCloudJson(publicId: string, data: any): Promise<boolean> {
  try {
    const { apiKey, apiSecret } = credentials();
    const timestamp = Math.floor(Date.now() / 1000);
    // Signed params must be alphabetically ordered.
    const toSign = `invalidate=true&overwrite=true&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(toSign).digest('hex');

    const jsonStr = JSON.stringify(data);
    const base64 = Buffer.from(jsonStr).toString('base64');
    const dataUri = `data:application/json;base64,${base64}`;

    const body = new URLSearchParams({
      file: dataUri,
      public_id: publicId,
      overwrite: 'true',
      invalidate: 'true',
      timestamp: String(timestamp),
      api_key: apiKey,
      signature: signature,
    });

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
      method: 'POST',
      body,
    });

    if (!res.ok) {
      console.warn(`[cloud-storage] Upload of ${publicId} failed:`, res.status, await res.text().catch(() => ''));
      return false;
    }

    const info = await res.json().catch(() => null);
    if (typeof info?.version === 'number') {
      versionMemo.set(publicId, { version: info.version, at: Date.now() });
    }
    return true;
  } catch (err) {
    console.warn(`[cloud-storage] Error uploading ${publicId}:`, err);
    return false;
  }
}

/**
 * Reads JSON data from Cloudinary Raw Storage. See freshness rules above.
 */
export async function fetchCloudJson<T = any>(
  publicId: string,
  opts: { exact?: boolean } = {}
): Promise<T | null> {
  try {
    let version: number | null = null;
    const own = versionMemo.get(publicId);
    if (opts.exact) {
      version = await exactVersion(publicId);
    } else if (own && Date.now() - own.at < OWN_WRITE_TTL_MS) {
      version = own.version;
    }

    const url = version
      ? `https://res.cloudinary.com/${cloudName}/raw/upload/v${version}/${publicId}`
      : `https://res.cloudinary.com/${cloudName}/raw/upload/${publicId}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data as T;
  } catch (err) {
    return null;
  }
}
