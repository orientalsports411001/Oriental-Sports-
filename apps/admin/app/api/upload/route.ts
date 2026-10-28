import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';

export async function POST(req: NextRequest) {
  await requireAdmin();

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file provided in form data.' }, { status: 400 });
    }

    const fileName = (file as any).name || 'product-image.png';
    const bytes = await file.arrayBuffer();
    const rawBuffer = Buffer.from(bytes);

    let finalDataUrl = '';
    let finalFormat = 'webp';

    try {
      // High-performance image optimization via sharp
      const sharp = (await import('sharp')).default;
      const optimizedBuffer = await sharp(rawBuffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
      finalDataUrl = `data:image/webp;base64,${optimizedBuffer.toString('base64')}`;
      finalFormat = 'webp';
    } catch {
      // Resilient fallback to raw base64 if sharp encounters non-standard formats
      const mime = file.type || 'image/png';
      finalDataUrl = `data:${mime};base64,${rawBuffer.toString('base64')}`;
      finalFormat = mime.split('/')[1] || 'png';
    }

    const safeId = `local_${Date.now()}_${fileName.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30)}`;

    return NextResponse.json({
      secure_url: finalDataUrl,
      public_id: safeId,
      format: finalFormat,
      bytes: rawBuffer.length,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed.' },
      { status: 500 }
    );
  }
}
