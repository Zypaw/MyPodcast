import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { podcastEpisodes, PodcastEpisode } from '../data/podcasts';
import { useAudio } from '../context/AudioContext';
import { Play, Pause, Calendar, Clock, Share2, Check } from 'lucide-react';
import PodcastCard from '../components/PodcastCard';
import PodcastDetailsSkeleton from '../components/PodcastDetailsSkeleton';
import { useScrollTop } from '../hooks/useScrollTop';

const PodcastPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<PodcastEpisode | null>(null);
  const [relatedEpisodes, setRelatedEpisodes] = useState<PodcastEpisode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCopied, setShowCopied] = useState(false);
  const scrollTop = useScrollTop();
  
  const { 
    playEpisode, 
    currentEpisode, 
    isPlaying, 
    togglePlayPause,
    formatTime,
    duration,
    currentTime,
    seek
  } = useAudio();
  
  const isCurrentEpisode = currentEpisode?.id === id;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const foundEpisode = podcastEpisodes.find(ep => ep.id === id);
      setEpisode(foundEpisode || null);
      
      if (foundEpisode) {
        // Find related episodes with similar topics
        const related = podcastEpisodes
          .filter(ep => 
            ep.id !== id && 
            ep.topics.some(topic => foundEpisode.topics.includes(topic))
          )
          .slice(0, 3);
        
        setRelatedEpisodes(related);
      }
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  if (isLoading) {
    return <PodcastDetailsSkeleton />;
  }
  
  if (!episode) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-neutral-900">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-white mb-4">Episode not found</h2>
          <Link 
            to="/" 
            onClick={scrollTop}
            className="text-primary-400 hover:text-primary-300 font-medium"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }
  
  const handlePlayClick = () => {
    if (isCurrentEpisode) {
      togglePlayPause();
    } else {
      playEpisode(episode);
    }
  };
  
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };
  
  const progress = duration ? (currentTime / duration) * 100 : 0;
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="w-full md:w-1/3">
                <img 
                  src={episode.image} 
                  alt={episode.title}
                  className="w-full aspect-square object-cover rounded-xl shadow-md"
                />
              </div>
              
              <div className="w-full md:w-2/3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {episode.topics.map((topic, index) => (
                    <Link
                      key={index}
                      to={`/search?topic=${topic}`}
                      onClick={scrollTop}
                      className="text-xs bg-primary-900/50 text-primary-300 px-3 py-1 rounded-full hover:bg-primary-800/50 transition-colors"
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {episode.title}
                </h1>
                
                <div className="flex flex-wrap gap-4 text-neutral-400 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={18} />
                    <span>{episode.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={18} />
                    <span>{episode.duration}</span>
                  </div>
                </div>
                
                <p className="text-neutral-300 mb-6">
                  {episode.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handlePlayClick}
                    className="flex items-center gap-2 bg-white hover:bg-neutral-200 text-neutral-900 font-medium py-3 px-6 rounded-full transition-colors"
                  >
                    {isCurrentEpisode && isPlaying ? (
                      <>
                        <Pause size={20} /> Pause Episode
                      </>
                    ) : (
                      <>
                        <Play size={20} className="ml-1" /> Play Episode
                      </>
                    )}
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-3 px-6 rounded-full transition-colors relative"
                  >
                    {showCopied ? (
                      <>
                        <Check size={20} /> Copied!
                      </>
                    ) : (
                      <>
                        <Share2 size={20} /> Share
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {isCurrentEpisode && (
              <div className="bg-neutral-800 rounded-xl shadow-md p-4 animate-fade-in">
                <div className="mb-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
                <div className="flex justify-between text-sm text-neutral-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Episode content */}
          <div className="bg-neutral-800 rounded-xl shadow-md p-6 md:p-8 mb-12">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-700">
              <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center text-white">
                {episode.host.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-white">Host: {episode.host}</h3>
                {episode.guest && (
                  <p className="text-neutral-400">Guest: {episode.guest}</p>
                )}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">Episode Notes</h2>
            <div className="prose max-w-none text-neutral-300">
              <p>{episode.longDescription || episode.description}</p>
              
              {/* Show long-form content if available */}
              {episode.longDescription && (
                <>
                  <h3 className="text-xl font-medium text-white mt-6 mb-3">Key Highlights</h3>
                  <ul className="text-neutral-300">
                    <li>The evolving landscape of technology and its impact on society</li>
                    <li>How to apply the latest research findings to everyday life</li>
                    <li>Practical steps for implementing new approaches</li>
                    <li>Resources and recommendations for further exploration</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium text-white mt-6 mb-3">Links & Resources</h3>
                  <ul>
                    <li><a href="#" className="text-primary-400 hover:text-primary-300">Visit our guest's website</a></li>
                    <li><a href="#" className="text-primary-400 hover:text-primary-300">Recommended books</a></li>
                    <li><a href="#" className="text-primary-400 hover:text-primary-300">Additional research papers</a></li>
                  </ul>
                </>
              )}
            </div>
          </div>
          
          {/* Related episodes */}
          {relatedEpisodes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedEpisodes.map(relatedEp => (
                  <PodcastCard key={relatedEp.id} episode={relatedEp} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastPage;