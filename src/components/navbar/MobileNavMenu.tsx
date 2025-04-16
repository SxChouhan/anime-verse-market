
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/components/navbar/types';
import { useAuth } from '@/context/AuthContext';

interface MobileNavMenuProps {
  navItems: NavItem[];
  handleNavigation: (path: string) => void;
  mobileMenuOpen: boolean;
}

const MobileNavMenu = ({ navItems, handleNavigation, mobileMenuOpen }: MobileNavMenuProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!mobileMenuOpen) return null;

  return (
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
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileNavMenu;
