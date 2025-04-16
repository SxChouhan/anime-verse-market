
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HamburgerMenu from '@/components/ui/HamburgerMenu';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

interface NavbarActionsProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  handleNavigation: (path: string) => void;
}

const NavbarActions = ({ mobileMenuOpen, toggleMobileMenu, handleNavigation }: NavbarActionsProps) => {
  const { user } = useAuth();
  const { getTotalItems } = useCart();
  
  return (
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
          toggleMenu={toggleMobileMenu}
        />
      </div>
    </div>
  );
};

export default NavbarActions;
