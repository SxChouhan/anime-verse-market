
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import HamburgerMenu from '@/components/ui/HamburgerMenu';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useBreakpoint } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const breakpoint = useBreakpoint();
  
  const isDesktop = breakpoint === 'desktop' || breakpoint === 'laptop';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    // Set CSS variable for navbar height to be used by other components
    document.documentElement.style.setProperty('--navbar-height', '72px');

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (isDesktop && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isDesktop, mobileMenuOpen]);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0); // Ensure we're at the top of the page
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    // If we're already on the home page, prevent default and scroll to top
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo(0, 0);
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Merchandise', path: '/merchandise' },
    { name: 'Costumes', path: '/costumes' },
    { name: 'Figures', path: '/figures' },
    { name: 'Posters', path: '/posters' },
    { name: 'Unique', path: '/unique' },
    { name: 'Custom', path: '/custom' },
  ];

  return (
    <header
      className="fixed w-full top-0 z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-2">
        <div className={`mx-auto rounded-full px-4 py-2 transition-all duration-300 ${
          isScrolled
            ? 'bg-otaku-dark/70 backdrop-blur-lg shadow-lg'
            : 'bg-black/30 backdrop-blur-sm'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo as a single element */}
            <a
              href="/"
              className="text-white text-xl font-bold drop-shadow-md whitespace-nowrap"
              onClick={handleLogoClick}
            >
              Otaku Collective
            </a>

            {/* Desktop Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className="text-white hover:text-otaku-purple transition-colors font-medium text-sm lg:text-base"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white relative hover:bg-white/10 rounded-full"
                onClick={() => handleNavigation('/cart')}
              >
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-otaku-purple text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>

              {user ? (
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 rounded-full"
                    onClick={() => handleNavigation('/profile')}
                  >
                    <User size={20} />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-otaku-purple text-white hover:bg-otaku-purple hover:text-white bg-otaku-purple/50 rounded-full hidden sm:flex"
                  onClick={() => handleNavigation('/login')}
                >
                  Login
                </Button>
              )}

              <div className="md:hidden">
                <HamburgerMenu
                  isOpen={mobileMenuOpen}
                  toggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-otaku-dark/90 backdrop-blur-lg py-4 border-t border-gray-800 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                className="text-white hover:text-otaku-purple transition-colors font-medium text-left py-2"
                onClick={() => handleNavigation(item.path)}
              >
                {item.name}
              </button>
            ))}
            {!user && (
              <Button
                variant="outline"
                size="sm"
                className="border-otaku-purple text-white hover:bg-otaku-purple hover:text-white bg-otaku-purple/50 rounded-full w-full mt-2"
                onClick={() => handleNavigation('/login')}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
