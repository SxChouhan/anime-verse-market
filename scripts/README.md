# Categories Update Script

This script automatically updates both anime and product categories based on the images in their respective directories:
- Anime categories: `src/resource/Home Page/Anime Category`
- Product categories: `src/resource/Home Page/Product Category`

## How It Works

The script:
1. Scans both image directories
2. Updates the relevant component files with the current list of categories
3. Handles both adding AND removing categories automatically

## How to Use

### Adding a New Category

1. Add your new image to the appropriate directory:
   - For anime: `src/resource/Home Page/Anime Category/`
   - For products: `src/resource/Home Page/Product Category/`

2. Use the correct naming convention:
   - For anime: Use kebab-case (e.g., `my-hero-academia.jpeg`)
   - For products: Use PascalCase (e.g., `Figures.jpeg`)

3. Supported formats: .jpeg, .jpg, .png

4. Run the update script:
   ```bash
   npm run update-categories
   ```

   Or simply double-click the `update-categories.bat` file in the project root.

5. Start or restart your development server to see the changes:
   ```bash
   npm run dev
   ```

### Removing a Category

1. Delete the image file from the appropriate directory
2. Run the update script
3. The category will be automatically removed from all relevant files

## Special Cases

If your anime image filename doesn't follow the standard kebab-case pattern or requires special formatting, you'll need to add it to the `specialCases` object in the `updateCategories.js` script.

For example:
```javascript
const specialCases = {
  'hunterxhunter': 'Hunter x Hunter',
  'dr.-stone': 'Dr. Stone',
  // Add your special case here
};
```

## Files Updated by the Script

The script updates the following files:

1. `src/components/home/AnimeCategories.tsx`
   - Updates the list of anime categories
   - Updates the special cases in the helper function

2. `src/components/home/ProductCategories.tsx`
   - Updates the list of product categories
   - Converts from using the data function to a static list if needed

3. `src/data/products.ts`
   - Updates the `getProductCategories()` function to match the available images

## Troubleshooting

If you encounter any issues:

1. Make sure your image is in the correct directory
2. Check that the image filename uses the correct case format:
   - Anime: kebab-case (lowercase with hyphens)
   - Products: PascalCase (capitalized words)
3. Verify that the image format is supported (.jpeg, .jpg, or .png)
4. If the anime name requires special formatting, add it to the special cases
