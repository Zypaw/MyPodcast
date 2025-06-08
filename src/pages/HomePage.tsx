import React, { useState, useEffect } from 'react';
import { podcastEpisodes } from '../data/podcasts';
import HeroSection from '../components/HeroSection';
import PodcastCard from '../components/PodcastCard';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollTop } from '../hooks/useScrollTop';
import PodcastCardSkeleton from '../components/PodcastCardSkeleton';
import Skeleton from '../components/ui/Skeleton';

const HomePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const scrollTop = useScrollTop();

  const featuredEpisodes = podcastEpisodes.filter(episode => episode.featured);
  const recentEpisodes = podcastEpisodes
    .filter(episode => !episode.featured)
    .slice(0, 3);
  
  const allTopics = podcastEpisodes.flatMap(episode => episode.topics);
  const uniqueTopics = Array.from(new Set(allTopics)).slice(0, 6);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('https://podcast.matteodupond.fr:3001/api/newsletter/subscribe', {
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
    <div className="min-h-screen">
      <HeroSection featuredEpisodes={featuredEpisodes} />
      
      {/* Recent Episodes Section */}
      <section id="latest-episodes" className="py-32 bg-neutral-900">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-bold text-white">Recent Episodes</h2>
            <Link 
              to="/search" 
              onClick={scrollTop}
              className="flex items-center text-primary-400 hover:text-primary-300 font-medium"
            >
              View All <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {isPageLoading ? (
              <>
                <PodcastCardSkeleton />
                <PodcastCardSkeleton />
                <PodcastCardSkeleton />
              </>
            ) : (
              recentEpisodes.map(episode => (
                <PodcastCard key={episode.id} episode={episode} />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Topics Section */}
      <section className="py-32 bg-neutral-800/50">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-white mb-16 text-center">Explore Topics</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {isPageLoading ? (
              <>
                {[...Array(6)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-32 w-full"
                    variant="rectangular"
                  />
                ))}
              </>
            ) : (
              uniqueTopics.map((topic, index) => (
                <Link 
                  key={index}
                  to={`/search?topic=${topic}`}
                  onClick={scrollTop}
                  className="bg-neutral-800 hover:bg-neutral-700 hover:text-primary-400 transition-colors duration-300 p-8 rounded-2xl text-center group flex flex-col items-center justify-center"
                >
                  <h3 className="font-medium text-white group-hover:text-primary-400 text-center">
                    {topic}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-2 text-center">
                    {podcastEpisodes.filter(ep => ep.topics.includes(topic)).length} episodes
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-32 bg-neutral-900">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Never Miss an Episode</h2>
            <p className="text-neutral-300 mb-12 text-lg">
              Get notified when we release new episodes. Subscribe to our newsletter for exclusive content and updates.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`bg-primary-600 hover:bg-primary-500 text-white font-medium py-4 px-8 rounded-xl transition-colors duration-300 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {message && (
                <p className={`mt-4 text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
                  {message}
                </p>
              )}
              <p className="text-sm text-neutral-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;