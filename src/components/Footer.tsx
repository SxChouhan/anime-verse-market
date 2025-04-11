
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-otaku-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Otaku Collective</h3>
            <p className="text-gray-400">
              Your one-stop shop for premium anime merchandise, costumes, figures, posters and more!
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-otaku-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/merchandise" className="text-gray-400 hover:text-otaku-purple transition-colors">
                  Merchandise
                </Link>
              </li>
              <li>
                <Link to="/figures" className="text-gray-400 hover:text-otaku-purple transition-colors">
                  Figures
                </Link>
              </li>
              <li>
                <Link to="/costumes" className="text-gray-400 hover:text-otaku-purple transition-colors">
                  Costumes
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-otaku-purple transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-400 hover:text-otaku-purple transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-gray-400 hover:text-otaku-purple transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-otaku-purple transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-otaku-purple transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-otaku-purple transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-otaku-purple transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-otaku-purple transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-400">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-otaku-purple"
                />
                <button className="bg-otaku-purple px-4 py-2 rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Otaku Collective. All rights reserved.
          </p>
          <p className="text-gray-400 mt-2 md:mt-0">
            Designed with 💜 for anime fans
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
