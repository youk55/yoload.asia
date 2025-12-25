import sharp from 'sharp';
import path from 'node:path';

const root = process.cwd();
const logo = path.join(root, 'public', 'logo.png');

async function gen(size, outName) {
  const out = path.join(root, 'public', outName);
  await sharp(logo)
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(out);
  console.log('Generated', outName);
}

await gen(180, 'apple-touch-icon.png');
await gen(32, 'favicon-32.png');
await gen(16, 'favicon-16.png');
await gen(192, 'android-chrome-192x192.png');
await gen(512, 'android-chrome-512x512.png');
