// generate_thumb_responsive.js
// Run with: node generate_thumb_responsive.js

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, 'public/images/Home/Thumbs');
const OUTPUT_DIR = path.join(__dirname, 'public/images/Home/Thumbs');
const SIZES = [200, 400, 600]; // Widths for responsive thumbnails
const QUALITY = 85;

console.log('🖼️  Generating responsive thumbnails...\n');

// Get all webp files in Thumbs
const files = fs.readdirSync(INPUT_DIR).filter(f => f.endsWith('.webp'));

files.forEach(file => {
  const inputPath = path.join(INPUT_DIR, file);

  SIZES.forEach(size => {
    const outputFilename = file.replace('.webp', `-${size}w.webp`);
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    sharp(inputPath)
      .resize(size, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath)
      .then(info => {
        console.log(`✓ Generated ${outputFilename} (${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)}KB)`);
      })
      .catch(err => {
        console.error(`✗ Failed to generate ${outputFilename}:`, err.message);
      });
  });
});

console.log('\n✨ Responsive thumbnails generated!');