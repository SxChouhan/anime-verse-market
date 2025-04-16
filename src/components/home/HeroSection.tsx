
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterText from '@/components/TypewriterText';
import { useAuth } from '@/context/AuthContext';

const HeroSection = () => {
  const { user } = useAuth();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
      videoRef.current.addEventListener('error', () => {
        setVideoError(true);
      });
    }

    // Check if we're on a mobile device with slow connection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (connection.saveData || connection.effectiveType.includes('2g'));

    // If on mobile with slow connection, use fallback image instead of video
    if (isMobile && isSlowConnection) {
      setVideoError(true);
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
    'Stickers'
  ];

  return (
    <section className="relative min-h-[600px] h-screen w-full overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={`w-full h-full object-cover md:object-[center_30%] transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/src/resource/Home Page/hero-section.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-otaku-dark to-black">
            <img
              src="/src/resource/Home Page/hero-fallback.jpg"
              alt="Hero Background"
              className="w-full h-full object-cover md:object-[center_30%] opacity-50"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent z-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20 mt-16 md:mt-0">
        <div className="max-w-2xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in drop-shadow-lg">
            One-Stop <span className="text-otaku-purple drop-shadow-[0_10px_2px_rgba(0,0,0,1)]">Otaku Island</span> for Premium <br />
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
                className="border-white/70 text-otaku-dark hover:bg-white hover:text-otaku-dark font-medium flex items-center gap-2 transition-all duration-300 ease-in-out"
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
