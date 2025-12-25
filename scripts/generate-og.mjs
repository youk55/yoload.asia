import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const __dirname = process.cwd();
const publicDir = path.join(__dirname, 'public');
const logoPath = path.join(publicDir, 'logo.png');
const outPath = path.join(publicDir, 'og.png');

const WIDTH = 1200;
const HEIGHT = 630;

async function main() {
  try {
    const logo = await sharp(logoPath).resize(220, 220, { fit: 'contain' }).png().toBuffer();

    // SVG overlay for title and subtitle
    const title = 'Yoload';
    const subtitle = 'Fast, modern logistics software';
    const url = 'https://yoload.asia';
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="24" y="24" width="${WIDTH-48}" height="${HEIGHT-48}" rx="24" fill="none" stroke="#e5e7eb" stroke-width="2"/>
  <g transform="translate(340, 235)">
    <text x="0" y="0" font-family="Inter, ui-sans-serif, system-ui" font-size="86" font-weight="700" fill="#0f172a">${title}</text>
    <text x="0" y="48" font-family="Inter, ui-sans-serif, system-ui" font-size="32" font-weight="500" fill="#334155">${subtitle}</text>
    <text x="0" y="90" font-family="Inter, ui-sans-serif, system-ui" font-size="24" font-weight="500" fill="#64748b">${url}</text>
  </g>
</svg>`;

    const bg = await sharp({ create: { width: WIDTH, height: HEIGHT, channels: 3, background: '#ffffff' } })
      .png()
      .toBuffer();

    const buffer = await sharp(bg)
      .composite([
        // Logo on the left
        { input: logo, left: 120, top: Math.round((HEIGHT - 220) / 2), blend: 'over' },
        // Text overlay
        { input: Buffer.from(svg), top: 0, left: 0, blend: 'over' },
      ])
      .png({ quality: 95 })
      .toBuffer();

    await fs.writeFile(outPath, buffer);
    console.log('Generated', outPath);
  } catch (err) {
    console.error('Failed to generate og.png:', err);
    process.exit(1);
  }
}

main();

