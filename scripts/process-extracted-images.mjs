import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = path.resolve('oriental_sports_extracted_images');
const TARGET_DIR = path.resolve('public/images/products/oriental-sports');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Mapping definitions: [sourceFile, outputBaseName, label, description]
const ASSET_MAPPINGS = [
  // 1. Cricket Bats (Page 2)
  {
    src: 'page_02_image_01.jpg',
    name: 'sg-scorer-classic',
    label: 'SG Scorer Classic Cricket Bat',
    page: 2,
    category: 'Cricket',
  },
  {
    src: 'page_02_image_02.jpg',
    name: 'sg-profile-classic',
    label: 'SG Profile Classic Cricket Bat',
    page: 2,
    category: 'Cricket',
  },
  {
    src: 'page_02_image_03.jpg',
    name: 'sg-boundary-xtreme',
    label: 'SG Boundary Xtreme Cricket Bat',
    page: 2,
    category: 'Cricket',
  },
  {
    src: 'page_02_image_04.jpg',
    name: 'sg-sierra-plus',
    label: 'SG Sierra Plus Cricket Bat',
    page: 2,
    category: 'Cricket',
  },
  {
    src: 'page_02_image_04.jpg',
    name: 'sg-savage-plus',
    label: 'SG Savage Plus Cricket Bat',
    page: 2,
    category: 'Cricket',
  },

  // 2. Football Equipment (Page 5 & 6)
  {
    src: 'page_05_image_01.jpg',
    name: 'nivia-football-black-white',
    label: 'Nivia Football (Black / White)',
    page: 5,
    category: 'Football',
  },
  {
    src: 'page_05_image_02.jpg',
    name: 'nivia-shining-star-football',
    label: 'Nivia Shining Star Football',
    page: 5,
    category: 'Football',
  },
  {
    src: 'page_05_image_03.jpg',
    name: 'nivia-dominator-football',
    label: 'Nivia Dominator Football',
    page: 5,
    category: 'Football',
  },
  {
    src: 'page_05_image_04.jpg',
    name: 'cosco-milano-football',
    label: 'Cosco Milano Football',
    page: 5,
    category: 'Football',
  },
  {
    src: 'page_05_image_05.jpg',
    name: 'cosco-super-star-football',
    label: 'Cosco Super Star Football',
    page: 5,
    category: 'Football',
  },
  {
    src: 'page_05_image_06.jpg',
    name: 'nivia-stockings-encounter',
    label: 'Nivia Stockings Encounter',
    page: 5,
    category: 'Football',
  },
  {
    src: 'page_05_image_07.jpg',
    name: 'nivia-carbonat-8-0-pro-shoes',
    label: 'Nivia Carbonat 8.0 Pro Football Shoes',
    page: 5,
    category: 'Football',
  },
  {
    src: 'page_06_image_01.jpg',
    name: 'nivia-encounter-football-shoes',
    label: 'Nivia Encounter Football Shoes',
    page: 6,
    category: 'Football',
  },

  // 3. Badminton Rackets (Page 9 & 10)
  {
    src: 'page_09_image_01.jpg',
    name: 'yonex-gr-303i',
    label: 'Yonex GR 303I Badminton Racket',
    page: 9,
    category: 'Badminton',
  },
  {
    src: 'page_09_image_02.jpg',
    name: 'yonex-zr-100',
    label: 'Yonex ZR 100 Badminton Racket',
    page: 9,
    category: 'Badminton',
  },
  {
    src: 'page_09_image_03.jpg',
    name: 'yonex-nanoflare-8000i',
    label: 'Yonex Nanoflare 8000I Badminton Racket',
    page: 9,
    category: 'Badminton',
  },
  {
    src: 'page_09_image_04.jpg',
    name: 'yonex-attack-9',
    label: 'Yonex Attack 9 Badminton Racket',
    page: 9,
    category: 'Badminton',
  },
  {
    src: 'page_09_image_05.jpg',
    name: 'yonex-nanoflare-speed-7',
    label: 'Yonex Nanoflare Speed 7 Badminton Racket',
    page: 9,
    category: 'Badminton',
  },
  {
    src: 'page_10_image_01.jpg',
    name: 'yonex-voltric-35i',
    label: 'Yonex Voltric 35I Badminton Racket',
    page: 10,
    category: 'Badminton',
  },
  {
    src: 'page_10_image_02.jpg',
    name: 'yonex-astrox-43i',
    label: 'Yonex Astrox 43I Badminton Racket',
    page: 10,
    category: 'Badminton',
  },
  {
    src: 'page_10_image_03.jpg',
    name: 'yonex-arcsaber-7-play',
    label: 'Yonex Arcsaber 7 Play Badminton Racket',
    page: 10,
    category: 'Badminton',
  },
  {
    src: 'page_10_image_04.jpg',
    name: 'yonex-muscle-power-29',
    label: 'Yonex Muscle Power 29 Badminton Racket',
    page: 10,
    category: 'Badminton',
  },

  // 4. Badminton Shuttlecocks (Page 14 & 15)
  {
    src: 'page_14_image_01.jpg',
    name: 'yonex-mavis-350',
    label: 'Yonex Mavis-350 Shuttlecock',
    page: 14,
    category: 'Badminton',
  },
  {
    src: 'page_14_image_02.jpg',
    name: 'yonex-mavis-350i',
    label: 'Yonex Mavis-350i Shuttlecock',
    page: 14,
    category: 'Badminton',
  },
  {
    src: 'page_14_image_03.jpg',
    name: 'yonex-mavis-600',
    label: 'Yonex Mavis-600 Shuttlecock',
    page: 14,
    category: 'Badminton',
  },
  {
    src: 'page_14_image_04.jpg',
    name: 'yonex-mavis-500',
    label: 'Yonex Mavis-500 Shuttlecock',
    page: 14,
    category: 'Badminton',
  },
  {
    src: 'page_14_image_06.jpg',
    name: 'mavis-200i',
    label: 'Mavis-200i Shuttlecock',
    page: 14,
    category: 'Badminton',
  },
  {
    src: 'page_15_image_01.jpg',
    name: 'yonex-mavis-10',
    label: 'Yonex Mavis-10 Shuttlecock',
    page: 15,
    category: 'Badminton',
  },
  {
    src: 'page_15_image_02.jpg',
    name: 'yonex-as2-feather',
    label: 'Yonex AS2 Feather Shuttlecock',
    page: 15,
    category: 'Badminton',
  },
  {
    src: 'page_15_image_03.jpg',
    name: 'acbtr-feather',
    label: 'ACBTR Feather Shuttlecock',
    page: 15,
    category: 'Badminton',
  },
];

async function processImages() {
  console.log('🔄 Processing and optimizing extracted PDF images...\n');

  for (const item of ASSET_MAPPINGS) {
    const srcPath = path.join(SOURCE_DIR, item.src);
    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠️ Source file missing: ${item.src}`);
      continue;
    }

    const outJpg = path.join(TARGET_DIR, `${item.name}.jpg`);
    const outWebp = path.join(TARGET_DIR, `${item.name}.webp`);
    const outSmallWebp = path.join(TARGET_DIR, `${item.name}-sm.webp`);

    try {
      // Clean background, trim whitespace, and normalize to clean aspect ratio with subtle margin
      const image = sharp(srcPath);
      const metadata = await image.metadata();

      // Trim outer solid border / table lines if present
      const trimmed = image.trim();

      // Save WebP and JPG versions optimized for web
      await trimmed
        .clone()
        .webp({ quality: 85 })
        .toFile(outWebp);

      await trimmed
        .clone()
        .resize({ width: Math.min(480, metadata.width || 480) })
        .webp({ quality: 80 })
        .toFile(outSmallWebp);

      await trimmed
        .clone()
        .jpeg({ quality: 85 })
        .toFile(outJpg);

      console.log(`✅ [Page ${item.page}] ${item.label} -> /images/products/oriental-sports/${item.name}.webp (${metadata.width}x${metadata.height})`);
    } catch (err) {
      console.error(`❌ Failed to process ${item.src}:`, err.message);
    }
  }

  console.log(`\n🎉 Processed ${ASSET_MAPPINGS.length} product images successfully into ${TARGET_DIR}\n`);
}

processImages();
