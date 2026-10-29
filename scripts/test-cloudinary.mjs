import assert from 'node:assert';
import {
  isCloudinaryUrl,
  getOptimizedImageUrl,
  generateSrcSet,
  DEFAULT_RESPONSIVE_WIDTHS,
} from '../src/lib/cloudinary.js';

console.log('🧪 Starting Cloudinary & Responsive Scaling Verification Tests...\n');

// 1. URL detection
console.log('1. Testing isCloudinaryUrl...');
assert.strictEqual(
  isCloudinaryUrl('https://res.cloudinary.com/oriental-sports/image/upload/v1729000000/products/bat.jpg'),
  true,
  'Standard Cloudinary URL should return true'
);
assert.strictEqual(
  isCloudinaryUrl('http://res.cloudinary.com/demo/image/upload/sample.png'),
  true,
  'Http Cloudinary URL should return true'
);
assert.strictEqual(
  isCloudinaryUrl('/images/products/oriental-sports/sg-scorer-classic.webp'),
  false,
  'Local path should return false'
);
assert.strictEqual(
  isCloudinaryUrl('https://images.unsplash.com/photo-1593341646782-e0b495cff86d'),
  false,
  'Unsplash URL should return false'
);
assert.strictEqual(isCloudinaryUrl(''), false, 'Empty string should return false');
assert.strictEqual(isCloudinaryUrl(null), false, 'Null should return false');
console.log('   ✓ isCloudinaryUrl passed all tests.');

// 2. Optimized URL generation
console.log('\n2. Testing getOptimizedImageUrl...');

// 2a. Simple Cloudinary URL without transform
const sample1 = 'https://res.cloudinary.com/oriental-sports/image/upload/v1729000000/products/bat.jpg';
const opt1 = getOptimizedImageUrl(sample1, { width: 800 });
console.log('   Transformed URL:', opt1);
assert.strictEqual(
  opt1,
  'https://res.cloudinary.com/oriental-sports/image/upload/f_auto,q_auto,c_limit,w_800/v1729000000/products/bat.jpg',
  'Should correctly insert f_auto,q_auto,c_limit,w_800 before version tag'
);

// 2b. Cloudinary URL with existing transform
const sample2 = 'https://res.cloudinary.com/oriental-sports/image/upload/w_500,c_scale/v1729000000/products/bat.jpg';
const opt2 = getOptimizedImageUrl(sample2, { width: 1024 });
console.log('   Replaced Transform URL:', opt2);
assert.strictEqual(
  opt2,
  'https://res.cloudinary.com/oriental-sports/image/upload/f_auto,q_auto,c_limit,w_1024/v1729000000/products/bat.jpg',
  'Should replace existing transform segment'
);

// 2c. Custom options (format, quality, crop, height)
const opt3 = getOptimizedImageUrl(sample1, { width: 400, height: 400, crop: 'thumb', quality: 'eco', format: 'webp' });
console.log('   Custom Options URL:', opt3);
assert.strictEqual(
  opt3,
  'https://res.cloudinary.com/oriental-sports/image/upload/f_webp,q_eco,c_thumb,w_400,h_400/v1729000000/products/bat.jpg',
  'Should apply custom format, quality, and crop'
);

// 2d. Local asset untouched
const localSample = '/images/products/oriental-sports/sg-scorer-classic.webp';
assert.strictEqual(getOptimizedImageUrl(localSample), localSample, 'Local path must not be modified');

// 2e. Unsplash optimization
const unsplashSample = 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=1400&q=80';
const optUnsplash = getOptimizedImageUrl(unsplashSample, { width: 640 });
console.log('   Unsplash Transformed:', optUnsplash);
assert.strictEqual(
  optUnsplash,
  'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=640&q=75',
  'Unsplash URL should carry correct width and query parameters'
);

console.log('   ✓ getOptimizedImageUrl passed all tests.');

// 3. Responsive srcSet generation
console.log('\n3. Testing generateSrcSet...');
const srcSetCloudinary = generateSrcSet(sample1);
console.log('   Generated Cloudinary srcSet snippet:');
console.log('   ' + srcSetCloudinary.slice(0, 160) + '...');

for (const w of DEFAULT_RESPONSIVE_WIDTHS) {
  assert(
    srcSetCloudinary.includes(`w_${w}/v1729000000/products/bat.jpg ${w}w`),
    `srcSet must contain candidate for width ${w}w`
  );
}
console.log(`   ✓ All ${DEFAULT_RESPONSIVE_WIDTHS.length} responsive widths [${DEFAULT_RESPONSIVE_WIDTHS.join(', ')}] present in srcSet!`);

// 3b. Local WebP twin
const localSrcSet = generateSrcSet('/images/hero/hero_train_perform.webp');
console.log('   Local srcSet:', localSrcSet);
assert.strictEqual(
  localSrcSet,
  '/images/hero/hero_train_perform-sm.webp 560w, /images/hero/hero_train_perform.webp 1024w',
  'Local WebP should return twin srcSet'
);

// 3c. Fallback for data URL
assert.strictEqual(generateSrcSet('data:image/png;base64,1234'), '', 'Data URL should return empty srcSet');

console.log('   ✓ generateSrcSet passed all tests.');

console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! Cloudinary responsive auto-scaling is fully verified.');
