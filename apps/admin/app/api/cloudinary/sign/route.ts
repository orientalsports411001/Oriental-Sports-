import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';
import { buildUploadSignature } from '@/lib/cloudinary';

/**
 * Signs an upload request so the browser can POST the file bytes directly to
 * Cloudinary (`https://api.cloudinary.com/v1_1/<cloud_name>/image/upload`)
 * without the file ever passing through this server. CLOUDINARY_API_SECRET
 * is only ever read here, server-side.
 */
export async function POST() {
  await requireAdmin();

  try {
    const signed = buildUploadSignature();
    return NextResponse.json(signed);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : '';
    if (errMsg.includes('Cloudinary is not configured')) {
      return NextResponse.json({
        local: true,
        message: 'Cloudinary credentials not set; routing upload to local asset storage.',
      });
    }
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Could not sign upload.' },
      { status: 500 }
    );
  }
}
