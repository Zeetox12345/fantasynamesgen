/**
 * This script ensures that all JSON data files are properly copied to the dist folder
 * during the build process for Vercel deployment.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source and destination directories
const sourceDir = path.resolve(__dirname, '../src/data');
const destDir = path.resolve(__dirname, '../dist/assets/data');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`Created directory: ${destDir}`);
}

// Function to copy files recursively
function copyFilesRecursively(source, destination) {
  // Check if source is a directory
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination, { recursive: true });
      console.log(`Created directory: ${destination}`);
    }
    
    // Get all files in the source directory
    const files = fs.readdirSync(source);
    
    // Copy each file to the destination directory
    for (const file of files) {
      const sourcePath = path.join(source, file);
      const destPath = path.join(destination, file);
      copyFilesRecursively(sourcePath, destPath);
    }
  } else if (stat.isFile() && path.extname(source) === '.json') {
    // Copy the file to the destination
    const destFilePath = destination;
    fs.copyFileSync(source, destFilePath);
    console.log(`Copied file: ${source} -> ${destFilePath}`);
  }
}

// Copy all JSON files from src/data to dist/assets/data
try {
  copyFilesRecursively(sourceDir, destDir);
  console.log('All JSON data files copied successfully!');
} catch (error) {
  console.error('Error copying JSON data files:', error);
  process.exit(1);
} 