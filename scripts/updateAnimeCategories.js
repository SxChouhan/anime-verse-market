import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const RESOURCE_DIR = path.join(__dirname, '../src/resource/Home Page');
const ANIME_IMAGES_DIR = path.join(RESOURCE_DIR, 'Anime Category');
const PRODUCT_IMAGES_DIR = path.join(RESOURCE_DIR, 'Product Category');
const ANIME_CATEGORIES_FILE = path.join(__dirname, '../src/components/home/AnimeCategories.tsx');
const PRODUCT_CATEGORIES_FILE = path.join(__dirname, '../src/components/home/ProductCategories.tsx');
const PRODUCTS_DATA_FILE = path.join(__dirname, '../src/data/products.ts');

/**
 * Converts a kebab-case filename to a proper title case name
 * @param {string} filename - The filename without extension
 * @returns {string} - The formatted name
 */
function formatName(filename) {
  // Special cases for formatting
  const specialCases = {
    'hunterxhunter': 'Hunter x Hunter',
    'dr.-stone': 'Dr. Stone',
    // Add more special cases as needed
  };

  if (specialCases[filename]) {
    return specialCases[filename];
  }

  // Default formatting: convert kebab-case to Title Case
  return filename
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Gets all names from the images directory
 * @param {string} directory - The directory to scan
 * @param {boolean} isProduct - Whether this is for product categories
 * @returns {string[]} - Array of names
 */
function getNamesFromImages(directory, isProduct = false) {
  try {
    const files = fs.readdirSync(directory);

    return files
      .filter(file => file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png'))
      .map(file => {
        const filename = path.basename(file, path.extname(file));
        // For products, we want to keep the original case since they're capitalized in the file
        return isProduct ? filename : formatName(filename);
      })
      .sort();
  } catch (error) {
    console.error(`Error reading images directory ${directory}:`, error);
    return [];
  }
}

/**
 * Updates the AnimeCategories.tsx file with the current list of anime
 * @param {string[]} animeNames - Array of anime names
 */
function updateAnimeCategories(animeNames) {
  try {
    // Read the current file content
    let content = fs.readFileSync(ANIME_CATEGORIES_FILE, 'utf8');

    // Create the updated anime list array
    const animeListString = animeNames
      .map(name => `  '${name}'`)
      .join(',\n');

    // Create the special cases for the helper function
    const specialCases = [
      "    case 'Hunter x Hunter':",
      "      return 'hunterxhunter';",
      "    case 'Dr. Stone':",
      "      return 'dr.-stone';",
      // Add more special cases as needed
    ].join('\n');

    // Replace the anime list in the file
    const animeListRegex = /const availableAnimeImages = \[\n([\s\S]*?)\];/;
    content = content.replace(
      animeListRegex,
      `const availableAnimeImages = [\n${animeListString}\n];`
    );

    // Replace the special cases in the helper function
    const helperFunctionRegex = /switch\(anime\) \{\n([\s\S]*?)    default:/;
    content = content.replace(
      helperFunctionRegex,
      `switch(anime) {\n${specialCases}\n    default:`
    );

    // Write the updated content back to the file
    fs.writeFileSync(ANIME_CATEGORIES_FILE, content, 'utf8');

    console.log('Successfully updated AnimeCategories.tsx with', animeNames.length, 'anime categories');
  } catch (error) {
    console.error('Error updating AnimeCategories.tsx:', error);
  }
}

/**
 * Updates the ProductCategories.tsx file to use a static list instead of getProductCategories()
 * @param {string[]} productNames - Array of product category names
 */
function updateProductCategoriesComponent(productNames) {
  try {
    // Read the current file content
    let content = fs.readFileSync(PRODUCT_CATEGORIES_FILE, 'utf8');

    // Check if we need to modify the file to use a static list
    if (content.includes('getProductCategories()')) {
      // Replace the import
      content = content.replace(
        "import { getProductCategories } from '@/data/products';",
        ''
      );

      // Replace the line that gets product categories
      content = content.replace(
        'const productCategories = getProductCategories();',
        `// List of product categories with available images
const productCategories = [
${productNames.map(name => `  "${name}"`).join(',\n')}
];`
      );

      console.log('Modified ProductCategories.tsx to use a static list');
    } else {
      // The file already has a static list, just update it
      const productListRegex = /const productCategories = \[\n([\s\S]*?)\];/;
      content = content.replace(
        productListRegex,
        `const productCategories = [\n${productNames.map(name => `  "${name}"`).join(',\n')}\n];`
      );
    }

    // Write the updated content back to the file
    fs.writeFileSync(PRODUCT_CATEGORIES_FILE, content, 'utf8');

    console.log('Successfully updated ProductCategories.tsx with', productNames.length, 'product categories');
  } catch (error) {
    console.error('Error updating ProductCategories.tsx:', error);
  }
}

/**
 * Updates the products.ts file with the current list of product categories
 * @param {string[]} productNames - Array of product category names
 */
function updateProductsData(productNames) {
  try {
    // Read the current file content
    let content = fs.readFileSync(PRODUCTS_DATA_FILE, 'utf8');

    // Find the getProductCategories function
    const productCategoriesRegex = /export const getProductCategories = \(\): string\[\] => \{\n  return \[\n([\s\S]*?)\n  \];\n\};/;

    // Create the updated product categories list
    const productListString = productNames
      .map(name => `    "${name}"`)
      .join(',\n');

    // Replace the product categories in the file
    content = content.replace(
      productCategoriesRegex,
      `export const getProductCategories = (): string[] => {\n  return [\n${productListString}\n  ];\n};`
    );

    // Write the updated content back to the file
    fs.writeFileSync(PRODUCTS_DATA_FILE, content, 'utf8');

    console.log('Successfully updated products.ts with', productNames.length, 'product categories');
  } catch (error) {
    console.error('Error updating products.ts:', error);
  }
}

/**
 * Main function to update categories
 */
function main() {
  // Update anime categories
  const animeNames = getNamesFromImages(ANIME_IMAGES_DIR);
  if (animeNames.length === 0) {
    console.error('No anime images found. Make sure the path is correct.');
  } else {
    console.log('Found', animeNames.length, 'anime categories:', animeNames.join(', '));
    updateAnimeCategories(animeNames);
  }

  // Update product categories
  const productNames = getNamesFromImages(PRODUCT_IMAGES_DIR, true);
  if (productNames.length === 0) {
    console.error('No product images found. Make sure the path is correct.');
  } else {
    console.log('Found', productNames.length, 'product categories:', productNames.join(', '));
    updateProductCategoriesComponent(productNames);
    updateProductsData(productNames);
  }
}

// Run the script
main();
