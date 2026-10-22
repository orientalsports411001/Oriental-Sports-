import fs from 'fs';
import https from 'https';

const urls = [
  'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/69477c244093753.698f8d5059c0b.png',
  'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/91bbf3244093753.698f8d5057f2d.png',
  'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/bf6021244093753.698f8d505beec.png',
  'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/7a16b0244093753.698f8d505cb54.png',
];

urls.forEach((url, i) => {
  const file = fs.createWriteStream(`buyur-sample-${i + 1}.png`);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded sample ${i + 1}`);
    });
  }).on('error', (err) => {
    fs.unlink(`buyur-sample-${i + 1}.png`, () => {});
    console.error('Error downloading:', err.message);
  });
});
