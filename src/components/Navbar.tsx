
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBreakpoint } from '@/hooks/use-mobile';
import NavbarContainer from '@/components/navbar/NavbarContainer';
import DesktopNav from '@/components/navbar/DesktopNav';
import NavbarActions from '@/components/navbar/NavbarActions';
import MobileNavMenu from '@/components/navbar/MobileNavMenu';
import { NavItem } from '@/components/navbar/types';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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

  const navItems: NavItem[] = [
    { name: 'Merchandise', path: '/merchandise' },
    { name: 'Costumes', path: '/costumes' },
    { name: 'Figures', path: '/figures' },
    { name: 'Posters', path: '/posters' },
    { name: 'Unique', path: '/unique' },
    { name: 'Custom', path: '/custom' },
  ];

  return (
    <>
      <NavbarContainer isScrolled={isScrolled}>
        {/* Logo as a single element */}
        <a
          href="/"
          className="text-white text-xl font-bold drop-shadow-md whitespace-nowrap"
          onClick={handleLogoClick}
        >
          Otaku Collective
        </a>
        
        {/* Desktop Navigation Menu */}
        <DesktopNav navItems={navItems} handleNavigation={handleNavigation} />

        {/* Navbar Actions (Cart, Profile, etc.) */}
        <NavbarActions 
          mobileMenuOpen={mobileMenuOpen} 
          toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} 
          handleNavigation={handleNavigation} 
        />
      </NavbarContainer>

      {/* Mobile Navigation Menu */}
      <MobileNavMenu 
        navItems={navItems} 
        handleNavigation={handleNavigation} 
        mobileMenuOpen={mobileMenuOpen} 
      />
    </>
  );
};

export default Navbar;
