import crypto from 'node:crypto';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'kvdrimse';
const apiKey = process.env.CLOUDINARY_API_KEY || '229393163346172';
const apiSecret = process.env.CLOUDINARY_API_SECRET || 'ARP9LG7XKb4or8YuKGbla17SL5s';

/**
 * Persists JSON data into Cloudinary Raw Storage as a resilient cloud-backed store.
 * Ensures orders and new products persist across independent serverless lambdas on Vercel.
 */
export async function uploadCloudJson(publicId: string, data: any): Promise<boolean> {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const toSign = `overwrite=true&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(toSign).digest('hex');

    const jsonStr = JSON.stringify(data);
    const base64 = Buffer.from(jsonStr).toString('base64');
    const dataUri = `data:application/json;base64,${base64}`;

    const body = new URLSearchParams({
      file: dataUri,
      public_id: publicId,
      overwrite: 'true',
      timestamp: String(timestamp),
      api_key: apiKey,
      signature: signature,
    });

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, {
      method: 'POST',
      body,
    });

    return res.ok;
  } catch (err) {
    console.warn(`[cloud-storage] Error uploading ${publicId}:`, err);
    return false;
  }
}

/**
 * Reads JSON data from Cloudinary Raw Storage.
 */
export async function fetchCloudJson<T = any>(publicId: string): Promise<T | null> {
  try {
    const res = await fetch(
      `https://res.cloudinary.com/${cloudName}/raw/upload/${publicId}?t=${Date.now()}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data as T;
  } catch (err) {
    return null;
  }
}

