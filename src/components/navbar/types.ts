
export interface NavItem {
  name: string;
  path: string;
}

export interface NavbarContainerProps {
  children: React.ReactNode;
  isScrolled: boolean;
}
