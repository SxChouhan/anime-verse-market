
import React from 'react';
import { NavbarContainerProps } from '@/components/navbar/types';

const NavbarContainer = ({ children, isScrolled }: NavbarContainerProps) => {
  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-2">
        <div className={`mx-auto rounded-full px-4 py-2 transition-all duration-300 ${
          isScrolled
            ? 'bg-otaku-dark/70 backdrop-blur-lg shadow-lg'
            : 'bg-black/30 backdrop-blur-sm'
        }`}>
          <div className="flex items-center justify-between">
            {children}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarContainer;
