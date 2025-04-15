# Managing Anime and Product Categories

This guide explains how to add or remove categories in the "Shop by Anime" and "Shop by Product" sections of the website.

## Quick Guide

### Adding a New Category

1. **Prepare your image**
   - Create or find an image for the category
   - Make sure it's in JPEG format (.jpeg or .jpg)
   - Recommended size: Square for anime, rectangular for products

2. **Name your image file properly**
   - For anime: Use kebab-case (e.g., `my-hero-academia.jpeg`)
   - For products: Use PascalCase (e.g., `Figures.jpeg`)

3. **Add the image to the correct directory**
   - For anime: `src/resource/Home Page/Anime Category/`
   - For products: `src/resource/Home Page/Product Category/`

4. **Run the update script**
   - Double-click the `update-categories.bat` file in the project root
   - OR run `npm run update-categories` in your terminal

5. **Restart your development server** (if it's running)
   - Stop the server (Ctrl+C)
   - Run `npm run dev` to start it again

6. **Verify the changes**
   - Open your browser and check that your new category appears

### Removing a Category

1. **Delete the image file** from the appropriate directory
2. **Run the update script**
3. The category will be automatically removed from the website

## Detailed Instructions

### For Anime Categories

1. **Image Requirements**
   - Format: JPEG (.jpeg or .jpg) or PNG (.png)
   - Size: Square (e.g., 300x300 pixels) works best
   - Quality: Clear, recognizable image representing the anime

2. **Naming Convention**
   - Use kebab-case: all lowercase with hyphens between words
   - Examples:
     - `attack-on-titan.jpeg`
     - `my-hero-academia.jpeg`
     - `jujutsu-kaisen.jpeg`

3. **Special Cases**
   - For anime names with special formatting (like "Hunter x Hunter"), use the standard format (`hunter-x-hunter.jpeg`) and the script will handle it
   - If needed, you can add special cases to the script (see Technical Details)

### For Product Categories

1. **Image Requirements**
   - Format: JPEG (.jpeg or .jpg) or PNG (.png)
   - Size: Rectangular (e.g., 600x400 pixels) works best
   - Quality: Clear, representative image of the product category

2. **Naming Convention**
   - Use PascalCase: Capitalized words with no spaces
   - Examples:
     - `Figures.jpeg`
     - `Merchandise.jpeg`
     - `Posters.jpeg`

## Technical Details

The update script automatically:

1. Scans both image directories
2. Updates the relevant component files with the current list of categories
3. Handles both adding AND removing categories

For more technical details, see the [script README](../scripts/README.md).

## Troubleshooting

If your category doesn't appear after running the script:

1. **Check the image file**
   - Is it in the correct directory?
   - Does it have the correct naming convention?
   - Is it a supported format (.jpeg, .jpg, or .png)?

2. **Check the console output**
   - Run the script from the terminal to see any error messages:
     ```bash
     npm run update-categories
     ```

3. **Restart the development server**
   - Sometimes changes aren't visible until you restart the server

4. **Check the browser console**
   - Open the browser developer tools (F12) to see if there are any errors loading the images
