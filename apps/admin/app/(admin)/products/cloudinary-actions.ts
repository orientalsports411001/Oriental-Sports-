'use server';

import { requireAdmin } from '@/lib/require-admin';
import { destroyCloudinaryAsset } from '@/lib/cloudinary';

/**
 * Deletes a single Cloudinary asset by public_id. Called directly from the
 * image gallery client component — both for images already persisted on a
 * product (public_id loaded from `products.cloudinary_public_ids`) and for
 * images uploaded during the current session on a not-yet-saved product
 * (the asset already exists in Cloudinary the moment the browser's direct
 * upload completes, regardless of whether the product row has been saved).
 *
 * Only ever called for an actual Cloudinary public_id — never for the
 * catalog's existing local `/images/...` paths, which have no Cloudinary
 * asset to delete.
 */
export async function deleteCloudinaryAssetAction(
  publicId: string
): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();

  if (!publicId || typeof publicId !== 'string') {
    return { ok: false, error: 'Missing public_id.' };
  }

  try {
    return await destroyCloudinaryAsset(publicId);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Could not delete Cloudinary asset.' };
  }
}
