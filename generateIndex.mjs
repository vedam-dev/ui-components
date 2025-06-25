
import path from 'path';
import fs from 'fs';

/**
 * Recursively finds all .tsx files in a directory and its subdirectories
 * @param {string} directoryPath The directory to search in
 * @returns {string[]} Array of absolute paths to .tsx files
 */
function findTsxFiles(directoryPath) {
  const tsxFiles = [];

  function scanDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath); // Recurse into subdirectory
      } else if (path.extname(fullPath) === '.tsx') {
        tsxFiles.push(fullPath); // Add .tsx file to results
      }
    }
  }

  scanDirectory(directoryPath);
  return tsxFiles;
}

/**
 * Generates export statements for all .tsx files
 * @param {string} directoryPath Root directory to scan
 * @param {string} outputFile Path to the output index.ts file
 */
function generateExports(directoryPath, outputFile) {
  const tsxFiles = findTsxFiles(directoryPath);
  const exports = [];

  tsxFiles.forEach(filePath => {
    // Convert to relative path from the output file's directory
    const relativePath = path.relative(
      path.dirname(outputFile),
      filePath.replace(/\.tsx$/, '') // Remove .tsx extension
    );

    // Get component name from filename (capitalized)
    const componentName = path
      .basename(filePath, '.tsx')
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    exports.push(`export { default as ${componentName} } from './${relativePath}';`);
  });

  // Write to index.ts
  fs.writeFileSync(outputFile, exports.join('\n') + '\n');
}

const componentDir = path.resolve('./src/component');
const outputFile = path.resolve('./src/index.ts');

generateExports(componentDir, outputFile);
