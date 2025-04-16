
import { NavItem } from '@/components/navbar/types';

interface DesktopNavProps {
  navItems: NavItem[];
  handleNavigation: (path: string) => void;
}

const DesktopNav = ({ navItems, handleNavigation }: DesktopNavProps) => {
  return (
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
  );
};

export default DesktopNav;
