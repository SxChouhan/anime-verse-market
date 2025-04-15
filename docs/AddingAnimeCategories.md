# How to Add New Anime Categories

This guide explains how to add new anime categories to the "Shop by Anime" section of the website.

## Quick Method (Recommended)

1. **Prepare your image**
   - Create or find an image for the anime you want to add
   - Make sure it's in JPEG format (.jpeg or .jpg)
   - Recommended size: Square (e.g., 300x300 pixels)

2. **Name your image file properly**
   - Use kebab-case (lowercase with hyphens)
   - Example: `my-hero-academia.jpeg`
   - For special formatting (like "Hunter x Hunter"), use the standard format (`hunter-x-hunter.jpeg`) and the script will handle it

3. **Add the image to the directory**
   - Place your image in: `src/resource/Home Page/Anime Category/`

4. **Run the update script**
   - Double-click the `update-anime.bat` file in the project root
   - OR run `npm run update-anime` in your terminal

5. **Restart your development server** (if it's running)
   - Stop the server (Ctrl+C)
   - Run `npm run dev` to start it again

6. **Verify the changes**
   - Open your browser and check the "Shop by Anime" section
   - Your new anime category should appear with the image you added

## Special Cases

If your anime name requires special formatting (e.g., capitalization, spaces, or special characters), you'll need to add it to the special cases in the script.

1. Open `scripts/updateAnimeCategories.js`

2. Find the `specialCases` object:
   ```javascript
   const specialCases = {
     'hunterxhunter': 'Hunter x Hunter',
     'dr.-stone': 'Dr. Stone',
     // Add your special case here
   };
   ```

3. Add your special case:
   ```javascript
   const specialCases = {
     'hunterxhunter': 'Hunter x Hunter',
     'dr.-stone': 'Dr. Stone',
     'your-filename': 'Your Properly Formatted Anime Name',
   };
   ```

4. Save the file and run the update script again

## Manual Method (Advanced)

If you prefer to manually update the code:

1. Add your image to `src/resource/Home Page/Anime Category/`

2. Open `src/components/home/AnimeCategories.tsx`

3. Add your anime to the `availableAnimeImages` array:
   ```javascript
   const availableAnimeImages = [
     'Attack on Titan',
     'Bleach',
     // ... other anime
     'Your New Anime',  // Add this line
   ];
   ```

4. If needed, add a special case to the `getAnimeImageFilename` function:
   ```javascript
   const getAnimeImageFilename = (anime: string): string => {
     switch(anime) {
       case 'Hunter x Hunter':
         return 'hunterxhunter';
       case 'Your New Anime':  // Add this case
         return 'your-filename';  // This should match your image filename without extension
       default:
         return anime.toLowerCase().replace(/\s+/g, '-');
     }
   };
   ```

5. Save the file and restart your development server
