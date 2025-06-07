import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Headphones } from 'lucide-react';
import NewsletterDialog from './NewsletterDialog';
import { useScrollTop } from '../hooks/useScrollTop';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-neutral-900/95 backdrop-blur-lg shadow-lg shadow-neutral-900/10' 
            : 'bg-gradient-to-b from-neutral-900/80 to-transparent backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white font-bold text-xl"
            >
              <Headphones size={24} />
              <span>MyPodcast</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLink to="/" label="Home" />
              <NavLink to="/search" label="Discover" />
              <NavLink to="/about" label="About" />
              <button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
              >
                Subscribe
              </button>
            </nav>

            {/* Mobile Nav Icons */}
            <div className="flex items-center md:hidden gap-4">
              <Link to="/search" aria-label="Search">
                <Search className="text-white" />
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="text-white"
              >
                {mobileMenuOpen ? 
                  <X size={24} /> : 
                  <Menu size={24} />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-900/95 backdrop-blur-lg absolute top-full left-0 right-0 shadow-lg animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <NavLink to="/" label="Home" mobile />
              <NavLink to="/search" label="Discover" mobile />
              <NavLink to="/about" label="About" mobile />
              <button 
                onClick={() => {
                  setIsDialogOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300 w-full text-center"
              >
                Subscribe
              </button>
            </div>
          </div>
        )}
      </header>

      <NewsletterDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  mobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, mobile }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const scrollTop = useScrollTop();
  
  return (
    <Link
      to={to}
      onClick={scrollTop}
      className={`${
        mobile ? 'block py-2' : ''
      } ${
        isActive 
          ? 'text-primary-400 font-medium' 
          : 'text-white/80 hover:text-white'
      } transition-colors duration-300`}
    >
      {label}
    </Link>
  );
};

export default Navbar;