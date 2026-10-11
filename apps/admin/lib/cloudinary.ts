import crypto from 'node:crypto';

/**
 * Cloudinary signed-upload + asset-management helpers (server only — never
 * import this from a client component). The browser uploads file bytes
 * directly to Cloudinary; this module only ever produces a signature or
 * calls Cloudinary's REST API with the api_secret, which never leaves the
 * server.
 *
 * Signature algorithm (per Cloudinary's documented spec):
 *   1. Take every param to sign (NOT including file, cloud_name, resource_type
 *      or api_key), sorted alphabetically by key.
 *   2. Join as `key1=value1&key2=value2&...` (no leading/trailing separators).
 *   3. Append the api_secret directly (no separator).
 *   4. SHA-1 (or SHA-256 for `signature_algorithm=sha256`) hex digest of that
 *      string is the signature.
 * https://cloudinary.com/documentation/signatures
 */

export type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

export function getCloudinaryConfig(): CloudinaryConfig {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.'
    );
  }

  return { cloudName, apiKey, apiSecret };
}

/** Builds the Cloudinary signature string and its SHA-1 hex digest for an arbitrary param set. */
export function signCloudinaryParams(params: Record<string, string | number>, apiSecret: string): string {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return crypto
    .createHash('sha1')
    .update(toSign + apiSecret)
    .digest('hex');
}

export const CLOUDINARY_UPLOAD_FOLDER = 'oriental-sports/products';
export const CLOUDINARY_ALLOWED_FORMATS = 'jpg,jpeg,png,webp';

/**
 * Builds the signed params for a direct-from-browser upload. The browser
 * POSTs the file plus these exact params (plus api_key) to
 * `https://api.cloudinary.com/v1_1/<cloud_name>/image/upload`.
 */
export function buildUploadSignature() {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);

  // Every one of these (except api_key) must be included verbatim in the
  // signed-params object — anything sent to Cloudinary's upload endpoint
  // that isn't `file`, `cloud_name`, `resource_type` or `api_key` must be
  // part of the signature, or Cloudinary rejects the request.
  const paramsToSign: Record<string, string | number> = {
    timestamp,
    folder: CLOUDINARY_UPLOAD_FOLDER,
    allowed_formats: CLOUDINARY_ALLOWED_FORMATS,
  };

  const signature = signCloudinaryParams(paramsToSign, apiSecret);

  return {
    cloudName,
    apiKey,
    timestamp,
    folder: CLOUDINARY_UPLOAD_FOLDER,
    allowedFormats: CLOUDINARY_ALLOWED_FORMATS,
    signature,
  };
}

/**
 * Deletes a single asset from Cloudinary by public_id via the signed
 * `destroy` admin API. Only ever call this for a URL that is actually a
 * Cloudinary delivery URL with a known public_id — never for the catalog's
 * existing local `/images/...` paths.
 */
export async function destroyCloudinaryAsset(publicId: string): Promise<{ ok: boolean; error?: string }> {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign: Record<string, string | number> = { public_id: publicId, timestamp };
  const signature = signCloudinaryParams(paramsToSign, apiSecret);

  const body = new URLSearchParams({
    public_id: publicId,
    timestamp: String(timestamp),
    api_key: apiKey,
    signature,
  });

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return { ok: false, error: `Cloudinary destroy failed (${res.status}): ${text}` };
  }

  const json: { result?: string } = await res.json().catch(() => ({}));
  if (json.result !== 'ok' && json.result !== 'not found') {
    return { ok: false, error: `Cloudinary destroy returned unexpected result: ${json.result}` };
  }

  return { ok: true };
}

/** True for any URL this app would have uploaded to Cloudinary (vs. the catalog's local `/images/...` paths). */
export function isCloudinaryUrl(url: string): boolean {
  return /^https?:\/\/res\.cloudinary\.com\//.test(url);
}
