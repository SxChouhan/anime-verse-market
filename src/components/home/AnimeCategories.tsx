
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// All available anime images
const availableAnimeImages = [
  'Attack on Titan',
  'Bleach',
  'Chainsaw Man',
  'Death Note',
  'Demon Slayer',
  'Dr. Stone',
  'Hunter x Hunter',
  'Jujutsu Kaisen',
  'My Hero Academia',
  'Naruto',
  'One Piece',
  'Solo Leveling',
  'Tokyo Revengers'
];

// Helper function to get anime placeholder image based on anime name
const getAnimePlaceholderImage = (anime: string): string => {
  // Use different Unsplash images for variety
  const placeholders = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop"
  ];
  
  // Generate a consistent index based on anime name
  const index = anime.length % placeholders.length;
  return placeholders[index];
};

const AnimeCategories = () => {
  // Use our predefined list of anime with images instead of the data-driven list
  const animeCategories = availableAnimeImages;

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white dark:from-otaku-dark/50 dark:to-otaku-dark/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by Anime
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {animeCategories.map(anime => (
            <Link
              key={anime}
              to={`/anime/${anime.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-gray-100 dark:bg-otaku-dark rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square bg-gray-200 dark:bg-gray-800 relative">
                <img
                  src={getAnimePlaceholderImage(anime)}
                  alt={anime}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Failed to load image for ${anime}`);
                    e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-otaku-purple/0 group-hover:bg-otaku-purple/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white font-medium opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-95 transition-all duration-300">
                    View All
                  </span>
                </div>
              </div>

              <div className="p-3 text-center">
                <h3 className="font-medium text-sm truncate group-hover:text-otaku-purple transition-colors">
                  {anime}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-otaku-purple text-otaku-purple hover:bg-otaku-purple hover:text-white"
            asChild
          >
            <Link to="/anime">Browse All Anime</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AnimeCategories;
