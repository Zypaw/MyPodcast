import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Mail, Github, Twitter, Rss, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('https://podcast.matteodupond.fr/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setIsError(true);
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setIsError(true);
      setMessage('Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-neutral-900 text-white pt-32 pb-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl mb-6">
              <Headphones size={24} />
              <span>MyPodcast</span>
            </Link>
            <p className="text-neutral-300 mb-8 max-w-md text-lg">
              Exploring fascinating conversations with leading experts across technology, science, 
              art, and culture to help you understand the world a little better.
            </p>
            <div className="flex space-x-6">
              <SocialLink icon={<Github size={20} />} href="https://github.com/Zypaw/MyPodcast" />
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-xl mb-6">Navigation</h3>
            <ul className="space-y-4">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/search" label="Discover" />
              <FooterLink to="/about" label="About" />
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-xl mb-6">Subscribe</h3>
            <p className="text-neutral-300 mb-6">Get the latest episodes in your inbox</p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className={`bg-primary-600 hover:bg-primary-500 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
              {message && (
                <p className={`text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 mt-8 text-neutral-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} MyPodcast. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a 
              href="https://creativecommons.org/licenses/by-nc/4.0/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              CC BY-NC 4.0 License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="bg-neutral-800 hover:bg-primary-600 p-3 rounded-xl transition-colors duration-300"
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <li>
      <Link 
        to={to} 
        className="text-neutral-300 hover:text-white transition-colors duration-300"
        onClick={handleClick}
      >
        {label}
      </Link>
    </li>
  );
};

export default Footer;