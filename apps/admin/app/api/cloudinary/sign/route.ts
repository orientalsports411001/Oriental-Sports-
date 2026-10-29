import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';
import { buildUploadSignature, isCloudinaryConfigured } from '@/lib/cloudinary';

/**
 * Checks Cloudinary configuration status so the admin UI can display
 * informative setup guidance or status indicator.
 */
export async function GET() {
  await requireAdmin();

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || null;
  const hasApiKey = Boolean(process.env.CLOUDINARY_API_KEY);
  const hasApiSecret = Boolean(process.env.CLOUDINARY_API_SECRET);
  const configured = isCloudinaryConfigured();

  const missing: string[] = [];
  if (!cloudName) missing.push('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
  if (!hasApiKey) missing.push('CLOUDINARY_API_KEY');
  if (!hasApiSecret) missing.push('CLOUDINARY_API_SECRET');

  return NextResponse.json({
    configured,
    cloudName,
    hasApiKey,
    hasApiSecret,
    missing,
  });
}

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
