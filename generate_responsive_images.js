// generate_responsive_images.js
// Run with: node generate_responsive_images.js

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(__dirname, 'public/images/Home');
const OUTPUT_DIR = path.join(__dirname, 'public/images/Home');
const SIZES = [400, 800, 1200]; // Widths for responsive images
const QUALITY = 85;

console.log('🖼️  Generating responsive hero images...\n');

// Process hero images
const heroImages = ['hero1.webp', 'hero2.webp'];

heroImages.forEach(image => {
  const inputPath = path.join(INPUT_DIR, image);

  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Skipping ${image} - not found`);
    return;
  }

  SIZES.forEach(size => {
    const outputFilename = image.replace('.webp', `-${size}w.webp`);
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

console.log('\n✨ Responsive images generated!');