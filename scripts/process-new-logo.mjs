import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_IMAGE = 'C:/Users/vighnesh jadhav/.gemini/antigravity-ide/brain/f607f9bf-3493-4916-8965-01d53e2393f7/.user_uploaded/media_1793091439689.png';
const OUT_DIR = path.resolve('public/brand');
const ARTIFACTS_DIR = path.resolve('artifacts/verification');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
if (!fs.existsSync(ARTIFACTS_DIR)) fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });

async function processLogo() {
  const { data, info } = await sharp(SRC_IMAGE)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // 1. Identify bounds of artwork (excluding caption at bottom, Y < 255)
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < 255; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (r < 248 || g < 248 || b < 248) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Padding
  const pad = 4;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(width - cropX, (maxX - minX + 1) + pad * 2);
  const cropH = Math.min(255 - cropY, (maxY - minY + 1) + pad * 2);

  console.log('Cropping full logo to:', { cropX, cropY, cropW, cropH });

  // 2. Extract cropped buffer
  const cropped = await sharp(SRC_IMAGE)
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cData = cropped.data;
  const cW = cropped.info.width;
  const cH = cropped.info.height;

  // 3. Mathematical alpha extraction from white background
  // For each pixel, determine alpha from distance to white (255, 255, 255)
  // And create two versions:
  // - Light surface version: original colors preserved
  // - Dark surface version: "ORIENTAL" text turned to crisp white (#FFFFFF), OS mark & SPORTS preserved
  const lightBuf = Buffer.alloc(cW * cH * 4);
  const darkBuf = Buffer.alloc(cW * cH * 4);

  // Note: Y coordinate in cropped coordinates where "ORIENTAL" text is located
  // In original image: Y=155 to Y=215 was "ORIENTAL", Y=215+ was "SPORTS"
  const orientalStartY = 155 - cropY;
  const orientalEndY = 215 - cropY;

  for (let y = 0; y < cH; y++) {
    for (let x = 0; x < cW; x++) {
      const srcIdx = (y * cW + x) * channels;
      const dstIdx = (y * cW + x) * 4;

      const r = cData[srcIdx];
      const g = cData[srcIdx + 1];
      const b = cData[srcIdx + 2];

      // Distance from white
      const diffR = 255 - r;
      const diffG = 255 - g;
      const diffB = 255 - b;
      const maxDiff = Math.max(diffR, diffG, diffB);

      let alpha = 0;
      if (maxDiff > 8) {
        // Smooth ramp from maxDiff=8 (alpha=0) to maxDiff=35 (full coverage)
        alpha = Math.min(255, Math.round((maxDiff / 255) * 255 * 1.08));
        if (maxDiff > 35) alpha = 255;
      }

      if (alpha === 0) {
        // Completely transparent
        lightBuf[dstIdx] = 0;
        lightBuf[dstIdx + 1] = 0;
        lightBuf[dstIdx + 2] = 0;
        lightBuf[dstIdx + 3] = 0;

        darkBuf[dstIdx] = 0;
        darkBuf[dstIdx + 1] = 0;
        darkBuf[dstIdx + 2] = 0;
        darkBuf[dstIdx + 3] = 0;
      } else {
        // Un-matte color against white: C_true = (C - (1 - a)*255) / a
        const aNorm = alpha / 255;
        const unmatte = (val) => Math.max(0, Math.min(255, Math.round((val - (1 - aNorm) * 255) / aNorm)));

        const uR = unmatte(r);
        const uG = unmatte(g);
        const uB = unmatte(b);

        // Light version
        lightBuf[dstIdx] = uR;
        lightBuf[dstIdx + 1] = uG;
        lightBuf[dstIdx + 2] = uB;
        lightBuf[dstIdx + 3] = alpha;

        // Dark version:
        // If this pixel is part of "ORIENTAL" text (navy / dark slate letters in Y range 155..215)
        // Detect dark navy pixels (low red, low green, relatively low blue, not orange, not cyan)
        const isOrientalText = (y >= orientalStartY && y <= orientalEndY) &&
                               (uR < 80 && uG < 80 && uB < 120);

        if (isOrientalText) {
          // Turn to pure white #FFFFFF with the exact same alpha
          darkBuf[dstIdx] = 255;
          darkBuf[dstIdx + 1] = 255;
          darkBuf[dstIdx + 2] = 255;
          darkBuf[dstIdx + 3] = alpha;
        } else {
          // Keep original vibrant colors for OS emblem and SPORTS text
          darkBuf[dstIdx] = uR;
          darkBuf[dstIdx + 1] = uG;
          darkBuf[dstIdx + 2] = uB;
          darkBuf[dstIdx + 3] = alpha;
        }
      }
    }
  }

  // Save the full stacked logos
  // Let's upscale slightly with high-quality lanczos3 so it's razor-sharp on retina screens
  const targetW = cW * 2;
  const targetH = cH * 2;

  await sharp(lightBuf, { raw: { width: cW, height: cH, channels: 4 } })
    .resize(targetW, targetH, { kernel: 'lanczos3' })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'oriental-sports-wordmark.png'));

  await sharp(darkBuf, { raw: { width: cW, height: cH, channels: 4 } })
    .resize(targetW, targetH, { kernel: 'lanczos3' })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'oriental-sports-wordmark-white.png'));

  console.log(`✅ Generated wordmarks: ${targetW}x${targetH}`);

  // 4. Generate the Monogram (OS mark only)
  // In original image: Y=0 to Y=152 was the OS emblem
  const monoPad = 4;
  const monoLeft = Math.max(0, 48 - monoPad);
  const monoTop = Math.max(0, 0);
  const monoW = Math.min(width - monoLeft, 435 - 48 + monoPad * 2);
  const monoH = Math.min(height, 154 + monoPad);

  const monoCropped = await sharp(SRC_IMAGE)
    .extract({ left: monoLeft, top: monoTop, width: monoW, height: monoH })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const mData = monoCropped.data;
  const mW = monoCropped.info.width;
  const mH = monoCropped.info.height;
  const monoBuf = Buffer.alloc(mW * mH * 4);

  for (let y = 0; y < mH; y++) {
    for (let x = 0; x < mW; x++) {
      const srcIdx = (y * mW + x) * channels;
      const dstIdx = (y * mW + x) * 4;

      const r = mData[srcIdx];
      const g = mData[srcIdx + 1];
      const b = mData[srcIdx + 2];

      const diffR = 255 - r;
      const diffG = 255 - g;
      const diffB = 255 - b;
      const maxDiff = Math.max(diffR, diffG, diffB);

      let alpha = 0;
      if (maxDiff > 8) {
        alpha = Math.min(255, Math.round((maxDiff / 255) * 255 * 1.08));
        if (maxDiff > 35) alpha = 255;
      }

      if (alpha === 0) {
        monoBuf[dstIdx] = 0;
        monoBuf[dstIdx + 1] = 0;
        monoBuf[dstIdx + 2] = 0;
        monoBuf[dstIdx + 3] = 0;
      } else {
        const aNorm = alpha / 255;
        monoBuf[dstIdx] = Math.max(0, Math.min(255, Math.round((r - (1 - aNorm) * 255) / aNorm)));
        monoBuf[dstIdx + 1] = Math.max(0, Math.min(255, Math.round((g - (1 - aNorm) * 255) / aNorm)));
        monoBuf[dstIdx + 2] = Math.max(0, Math.min(255, Math.round((b - (1 - aNorm) * 255) / aNorm)));
        monoBuf[dstIdx + 3] = alpha;
      }
    }
  }

  await sharp(monoBuf, { raw: { width: mW, height: mH, channels: 4 } })
    .resize(mW * 2, mH * 2, { kernel: 'lanczos3' })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'oriental-sports-monogram.png'));

  // Monogram white is identical because the OS emblem itself has vivid blue/orange gradient
  await sharp(monoBuf, { raw: { width: mW, height: mH, channels: 4 } })
    .resize(mW * 2, mH * 2, { kernel: 'lanczos3' })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'oriental-sports-monogram-white.png'));

  // 5. Generate high-res Favicon (192x192, 512x512) and public/favicon.png
  await sharp(monoBuf, { raw: { width: mW, height: mH, channels: 4 } })
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(path.resolve('public'), 'favicon.png'));

  console.log('✅ Generated monograms and favicon.png');

  // 6. Test rendering on both black and white background for visual verification
  await sharp({
    create: {
      width: targetW + 80,
      height: targetH + 80,
      channels: 4,
      background: { r: 5, g: 5, b: 5, alpha: 1 }
    }
  })
  .composite([{ input: path.join(OUT_DIR, 'oriental-sports-wordmark-white.png'), top: 40, left: 40 }])
  .png()
  .toFile(path.join(ARTIFACTS_DIR, 'test-new-logo-on-dark.png'));

  await sharp({
    create: {
      width: targetW + 80,
      height: targetH + 80,
      channels: 4,
      background: { r: 246, g: 243, b: 234, alpha: 1 }
    }
  })
  .composite([{ input: path.join(OUT_DIR, 'oriental-sports-wordmark.png'), top: 40, left: 40 }])
  .png()
  .toFile(path.join(ARTIFACTS_DIR, 'test-new-logo-on-cream.png'));

  console.log('✅ Visual verification images generated in artifacts/verification/');
}

processLogo().catch(console.error);
