// optimize-images.js
// Run with: node optimize-images.js

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURE THESE
const INPUT_DIR = path.join(__dirname, 'public/images');
const OUTPUT_DIR = path.join(__dirname, 'public/images-webp');
const QUALITY = 90; // Higher = better quality, bigger file (85-95 recommended)

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🖼️  Converting images to WebP...\n');

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let processedCount = 0;
const promises = [];

// Process all image files
function processDirectory(dir, relativeDir = '') {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const inputPath = path.join(dir, item);
    const stat = fs.statSync(inputPath);
    
    // Handle subdirectories
    if (stat.isDirectory()) {
      const newRelativeDir = path.join(relativeDir, item);
      const newOutputDir = path.join(OUTPUT_DIR, newRelativeDir);
      if (!fs.existsSync(newOutputDir)) {
        fs.mkdirSync(newOutputDir, { recursive: true });
      }
      processDirectory(inputPath, newRelativeDir);
      return;
    }
    
    // Only process image files
    if (!/\.(jpg|jpeg|png|gif)$/i.test(item)) {
      return;
    }
    
    const originalSize = stat.size;
    const outputFilename = item.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
    const outputPath = path.join(OUTPUT_DIR, relativeDir, outputFilename);
    
    const promise = sharp(inputPath)
      .webp({ 
        quality: QUALITY,
        effort: 6 // 0-6, higher = better compression but slower (6 recommended)
      })
      .toFile(outputPath)
      .then(info => {
        const savedKB = ((originalSize - info.size) / 1024).toFixed(1);
        const percentSaved = (((originalSize - info.size) / originalSize) * 100).toFixed(1);
        
        totalOriginalSize += originalSize;
        totalOptimizedSize += info.size;
        processedCount++;
        
        console.log(`✓ ${item}`);
        console.log(`  ${(originalSize / 1024).toFixed(1)}KB → ${(info.size / 1024).toFixed(1)}KB (saved ${savedKB}KB / ${percentSaved}%)\n`);
      })
      .catch(err => {
        console.error(`✗ Failed to process ${item}:`, err.message);
      });
    
    promises.push(promise);
  });
}

// Start processing
processDirectory(INPUT_DIR);

// Wait for all conversions to complete, then show summary
Promise.all(promises).then(() => {
  console.log('━'.repeat(50));
  console.log('📊 SUMMARY\n');
  console.log(`Images processed: ${processedCount}`);
  console.log(`Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total saved: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Reduction: ${(((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1)}%`);
  console.log('\n✨ All images converted to WebP!');
  console.log(`📁 Check your optimized images in: ${OUTPUT_DIR}`);
});