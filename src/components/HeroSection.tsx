import React, { useState } from 'react';
import { PodcastEpisode } from '../data/podcasts';
import PodcastCard from './PodcastCard';
import NewsletterDialog from './NewsletterDialog';

interface HeroSectionProps {
  featuredEpisodes: PodcastEpisode[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredEpisodes }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section className="pt-40 pb-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900/30">
      <div className="container mx-auto px-8">
        <div className="max-w-3xl mb-24 animate-slide-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Stories that <span className="text-primary-400">inform</span>,<br />
            <span className="text-primary-400">inspire</span> and <span className="text-primary-400">entertain</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-12">
            Join us for conversations with leading thinkers and creators exploring 
            ideas that shape our world and expand our horizons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#latest-episodes" 
              className="bg-white text-neutral-900 hover:bg-neutral-100 transition-colors duration-300 font-medium rounded-xl px-8 py-4 text-center"
            >
              Latest Episodes
            </a>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-neutral-800/40 backdrop-blur-sm text-white hover:bg-neutral-700/60 transition-colors duration-300 font-medium rounded-xl px-8 py-4"
            >
              Subscribe to Podcast
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {featuredEpisodes.map((episode) => (
            <PodcastCard key={episode.id} episode={episode} featured />
          ))}
        </div>
      </div>

      <NewsletterDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </section>
  );
};

export default HeroSection;