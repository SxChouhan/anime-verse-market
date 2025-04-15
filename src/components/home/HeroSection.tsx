
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterText from '@/components/TypewriterText';
import { useAuth } from '@/context/AuthContext';

const HeroSection = () => {
  const { user } = useAuth();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

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

  const typewriterTexts = [
    'Merchandise',
    'Costumes',
    'Figures',
    'Posters',
    'Stickers',
    'Unique Products'
  ];

  return (
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
  );
};

export default HeroSection;
