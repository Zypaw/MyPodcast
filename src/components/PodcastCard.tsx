import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { PodcastEpisode } from '../data/podcasts';
import { useAudio } from '../context/AudioContext';
import { useScrollTop } from '../hooks/useScrollTop';

interface PodcastCardProps {
  episode: PodcastEpisode;
  featured?: boolean;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ episode, featured }) => {
  const { playEpisode, currentEpisode, isPlaying, togglePlayPause } = useAudio();
  
  const isCurrentEpisode = currentEpisode?.id === episode.id;
  const scrollTop = useScrollTop();
  
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCurrentEpisode) {
      togglePlayPause();
    } else {
      playEpisode(episode);
    }
  };
  
  if (featured) {
    return (
      <div className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <img 
          src={episode.image} 
          alt={episode.title}
          className="w-full h-[400px] object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="flex items-center space-x-2 mb-3">
            <span className="bg-primary-600 text-white text-xs font-medium px-2.5 py-1 rounded">FEATURED</span>
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded">{episode.duration}</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{episode.title}</h3>
          <p className="text-neutral-200 mb-4 line-clamp-2">{episode.description}</p>
          
          <div className="flex items-center justify-between">
            <Link 
              to={`/podcast/${episode.id}`}
              onClick={scrollTop}
              className="text-white underline underline-offset-2 hover:text-primary-400 transition-colors"
            >
              View Episode
            </Link>
            <button
              onClick={handlePlayClick}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              aria-label={isCurrentEpisode && isPlaying ? "Pause episode" : "Play episode"}
            >
              <Play size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
      <Link to={`/podcast/${episode.id}`} onClick={scrollTop} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={episode.image} 
            alt={episode.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={handlePlayClick}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              aria-label={isCurrentEpisode && isPlaying ? "Pause episode" : "Play episode"}
            >
              <Play size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-neutral-500">{episode.date}</span>
          <span className="text-sm text-neutral-500">{episode.duration}</span>
        </div>
        
        <Link to={`/podcast/${episode.id}`} onClick={scrollTop} className="block">
          <h3 className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {episode.title}
          </h3>
        </Link>
        
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
          {episode.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {episode.topics.map((topic, index) => (
            <span 
              key={index}
              className="text-xs bg-neutral-100 text-neutral-800 px-2 py-1 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;