import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function POST(req: NextRequest) {
  await requireAdmin();

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file provided in form data.' }, { status: 400 });
    }

    const fileName = (file as any).name || 'product-image.png';
    const ext = path.extname(fileName) || '.png';
    const baseName = path.basename(fileName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeName = `${Date.now()}-${baseName}${ext}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to admin public directory
    const adminUploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(adminUploadsDir, { recursive: true });
    await fs.writeFile(path.join(adminUploadsDir, safeName), buffer);

    // Also mirror to root/storefront public directory if it exists
    const rootUploadsDir = path.join(process.cwd(), '..', '..', 'public', 'uploads');
    try {
      await fs.mkdir(rootUploadsDir, { recursive: true });
      await fs.writeFile(path.join(rootUploadsDir, safeName), buffer);
    } catch {
      // Ignored if root path differs
    }

    const secureUrl = `/uploads/${safeName}`;

    return NextResponse.json({
      secure_url: secureUrl,
      public_id: `local_${safeName}`,
      format: ext.replace('.', ''),
      bytes: buffer.length,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed.' },
      { status: 500 }
    );
  }
}
