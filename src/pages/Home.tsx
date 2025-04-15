import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TypewriterText from '@/components/TypewriterText';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/context/AuthContext';
import { getTrendingProducts, getAnimeCategories, getProductCategories } from '@/data/products';
import { useBreakpoint } from '@/hooks/use-mobile';

const Home = () => {
  const { user } = useAuth();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const breakpoint = useBreakpoint();
  const navigate = useNavigate();

  const trendingProducts = getTrendingProducts().slice(0, 8);
  const animeCategories = getAnimeCategories().slice(0, 11);
  const productCategories = getProductCategories();

  const typewriterTexts = [
    'Merchandise',
    'Costumes',
    'Figures',
    'Posters',
    'Stickers',
    'Unique Products'
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  const scrollToTrending = () => {
    const trendingSection = document.getElementById('trending-section');
    if (trendingSection) {
      trendingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
    window.scrollTo(0, 0);
  };

  const sectionBackgroundStyles = {
    trending: "bg-gradient-to-b from-gray-100 to-white dark:from-otaku-dark/40 dark:to-otaku-dark/20",
    anime: "bg-gradient-to-r from-gray-50 to-white dark:from-otaku-dark/50 dark:to-otaku-dark/30",
    product: "bg-gradient-to-b from-white to-gray-100 dark:from-otaku-dark/20 dark:to-otaku-dark/40",
    review: "bg-gradient-to-r from-white to-gray-50 dark:from-otaku-dark/30 dark:to-otaku-dark/50"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="relative h-screen w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className={`w-full h-full object-cover ${isVideoLoaded ? 'opacity-70' : 'opacity-0'}`}
          >
            <source src="/src/resource/Home Page/Hero Section.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20 mt-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in drop-shadow-lg">
              Your One-Stop Shop for Premium <br />
              <TypewriterText 
                textArray={typewriterTexts}
                className="text-otaku-purple font-extrabold"
              />
            </h1>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={scrollToTrending}
                size="lg"
                className="bg-otaku-purple hover:bg-otaku-purple/90 text-white font-medium"
              >
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              {!user && (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/70 text-white hover:bg-white hover:text-otaku-dark font-medium flex items-center gap-2 transition-all duration-300 ease-in-out"
                  onClick={handleLoginClick}
                >
                  <LogIn className="h-5 w-5" /> Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section id="trending-section" className={`py-16 ${sectionBackgroundStyles.trending}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trending Products
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-otaku-purple text-otaku-purple hover:bg-otaku-purple hover:text-white"
              asChild
            >
              <Link to="/merchandise">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className={`py-16 ${sectionBackgroundStyles.anime}`}>
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
                      e.currentTarget.src = "/placeholder.svg"; // Fallback image
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
      
      <section className={`py-16 ${sectionBackgroundStyles.product}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Product
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "Figures",
              "Merchandise",
              "Stickers",
              "Posters",
              "Costumes",
              "Unique"
            ].map(category => (
              <Link 
                key={category}
                to={`/${category.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg shadow-md h-64"
              >
                <img 
                  src={`/src/resource/Home Page/Product Category/${category}.jpeg`}
                  alt={category}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    console.error(`Failed to load image for ${category}`);
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white capitalize mb-2">
                      {category}
                    </h3>
                    <span className="inline-block text-white font-medium underline transform translate-y-0 group-hover:translate-y-0 opacity-100 group-hover:opacity-100 transition-all duration-300">
                      Shop Now
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className={`py-16 ${sectionBackgroundStyles.review}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Customer Reviews
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-otaku-dark shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 rounded-full w-12 h-12"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Mikasa A.</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className="text-yellow-400 fill-yellow-400" 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The Attack on Titan merch I bought is stunning! Incredible quality and fast shipping."
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg w-32 h-32">
                <img src="/placeholder.svg" alt="Review" className="w-full h-full object-cover rounded" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-otaku-dark shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 rounded-full w-12 h-12"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Gojo S.</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The Jujutsu Kaisen figure exceeded my expectations. Simply perfect for my collection!"
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg w-32 h-32">
                <img src="/placeholder.svg" alt="Review" className="w-full h-full object-cover rounded" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-otaku-dark shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 rounded-full w-12 h-12"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Tanjiro K.</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "These Demon Slayer posters look even better in person! The print quality is superb."
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg w-32 h-32">
                <img src="/placeholder.svg" alt="Review" className="w-full h-full object-cover rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;

const Star = ({ size, className }: { size: number, className: string }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};
