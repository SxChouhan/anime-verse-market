const fs = require('fs');
const path = require('path');

// Source and destination directories
const SRC_DIR = path.join(__dirname, 'src', 'resource');
const DEST_DIR = path.join(__dirname, 'dist', 'src', 'resource');

// Create the destination directory if it doesn't exist
function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Copy a file from source to destination
function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  ensureDirectoryExistence(destDir);
  
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${src} -> ${dest}`);
}

// Copy a directory recursively
function copyDir(src, dest) {
  ensureDirectoryExistence(dest);
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// Start copying
console.log('Copying resource files...');
ensureDirectoryExistence(DEST_DIR);
copyDir(SRC_DIR, DEST_DIR);
console.log('Resource files copied successfully!');
