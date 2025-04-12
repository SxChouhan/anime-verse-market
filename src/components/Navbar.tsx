
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set CSS variable for navbar height to be used by other components
    document.documentElement.style.setProperty('--navbar-height', '72px'); // Adjust if needed
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            <Link to="/" className="text-white text-xl font-bold drop-shadow-md">
              Otaku Collective
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/merchandise" className="text-white hover:text-otaku-purple transition-colors font-medium">
                Merchandise
              </Link>
              <Link to="/costumes" className="text-white hover:text-otaku-purple transition-colors font-medium">
                Costumes
              </Link>
              <Link to="/figures" className="text-white hover:text-otaku-purple transition-colors font-medium">
                Figures
              </Link>
              <Link to="/posters" className="text-white hover:text-otaku-purple transition-colors font-medium">
                Posters
              </Link>
              <Link to="/unique" className="text-white hover:text-otaku-purple transition-colors font-medium">
                Unique
              </Link>
              <Link to="/custom" className="text-white hover:text-otaku-purple transition-colors font-medium">
                Custom
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white relative hover:bg-white/10 rounded-full"
                onClick={() => navigate('/cart')}
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
                    onClick={() => navigate('/profile')}
                  >
                    <User size={20} />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-otaku-purple text-white hover:bg-otaku-purple hover:text-white bg-otaku-purple/50 rounded-full"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10 rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-otaku-dark/80 backdrop-blur-lg py-4 border-t border-gray-800 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/merchandise" 
              className="text-white hover:text-otaku-purple transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Merchandise
            </Link>
            <Link 
              to="/costumes" 
              className="text-white hover:text-otaku-purple transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Costumes
            </Link>
            <Link 
              to="/figures" 
              className="text-white hover:text-otaku-purple transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Figures
            </Link>
            <Link 
              to="/posters" 
              className="text-white hover:text-otaku-purple transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Posters
            </Link>
            <Link 
              to="/unique" 
              className="text-white hover:text-otaku-purple transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Unique
            </Link>
            <Link 
              to="/custom" 
              className="text-white hover:text-otaku-purple transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Custom
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
