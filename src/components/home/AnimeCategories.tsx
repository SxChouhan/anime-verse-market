import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getAnimeCategories } from '@/data/products';

const AnimeCategories = () => {
  const animeCategories = getAnimeCategories().slice(0, 11);

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
                  src={`/src/resource/Home Page/Anime Category/${anime.replace(/\s+/g, ' ')}.jpeg`}
                  alt={anime}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Failed to load image for ${anime}`);
                    e.currentTarget.src = "/placeholder.svg";
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
