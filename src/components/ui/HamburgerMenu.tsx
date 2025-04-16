
import React from 'react';

interface HamburgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, toggleMenu }) => {
  return (
    <div className="relative">
      <label htmlFor="burger" className="relative block w-7 h-5 cursor-pointer">
        <input
          id="burger"
          type="checkbox"
          checked={isOpen}
          onChange={toggleMenu}
          className="hidden"
        />
        <span className={`block absolute h-0.5 w-full bg-white rounded-full left-0 transform transition-all duration-300 ${
          isOpen ? 'top-0 left-0.5 rotate-45' : 'top-0'
        }`} />
        <span className={`block absolute h-0.5 w-full bg-white rounded-full left-0 top-1/2 -translate-y-1/2 transform transition-all duration-300 ${
          isOpen ? 'w-0 opacity-0' : ''
        }`} />
        <span className={`block absolute h-0.5 w-full bg-white rounded-full left-0 transform transition-all duration-300 ${
          isOpen ? 'top-2 left-0.5 -rotate-45' : 'top-4'
        }`} />
      </label>
    </div>
  );
}

export default HamburgerMenu;
