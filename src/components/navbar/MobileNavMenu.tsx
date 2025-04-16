
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
    <div className="md:hidden fixed top-[72px] left-0 right-0 z-50 bg-black/30 backdrop-blur-sm py-4 border-t border-gray-800/30 animate-fade-in max-h-[calc(100vh-72px)] overflow-y-auto shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4 bg-transparent">
        {navItems.map((item) => (
          <button
            key={item.name}
            className="text-white hover:text-otaku-purple transition-colors font-medium text-center py-2 w-40"
            onClick={() => handleNavigation(item.path)}
          >
            {item.name}
          </button>
        ))}
        {!user && (
          <Button
            variant="outline"
            size="sm"
            className="border-otaku-purple text-white hover:bg-otaku-purple hover:text-white bg-otaku-purple/50 rounded-full w-40 mt-2"
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
