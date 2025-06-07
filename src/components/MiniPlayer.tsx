import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';
import { Link, useLocation } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, Minimize2, Maximize2 } from 'lucide-react';
import { useScrollTop } from '../hooks/useScrollTop';

interface MiniPlayerProps {
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ isExpanded, onExpandedChange }) => {
  const { 
    currentEpisode, 
    isPlaying, 
    togglePlayPause, 
    duration, 
    currentTime,
    volume,
    isMuted,
    seek,
    setVolume,
    toggleMute,
    formatTime
  } = useAudio();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const location = useLocation();
  const scrollTop = useScrollTop();

  // Hide player if we're on the current episode's detail page
  if (!currentEpisode || location.pathname === `/podcast/${currentEpisode.id}`) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className={`fixed transition-all duration-500 ease-in-out z-40 ${
        isExpanded 
          ? 'inset-0 bg-neutral-900' 
          : 'bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800'
      }`}
    >
      {isExpanded ? (
        // Full-screen expanded view
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-neutral-800">
            <button
              onClick={() => onExpandedChange(false)}
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Minimize player"
            >
              <Minimize2 size={24} />
            </button>
            <Link 
              to={`/podcast/${currentEpisode.id}`}
              onClick={() => {
                scrollTop();
                onExpandedChange(false);
              }}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Episode Details
            </Link>
          </div>

          {/* Main content */}
          <div className="flex-grow flex flex-col md:flex-row">
            {/* Episode info for mobile */}
            <div className="md:hidden p-4">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-medium text-white mb-4">
                  {currentEpisode.title}
                </h2>
                <p className="text-lg text-neutral-400 mb-6">
                  {currentEpisode.host}
                  {currentEpisode.guest && ` with ${currentEpisode.guest}`}
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  {currentEpisode.description}
                </p>
              </div>
            </div>

            {/* Left side - Album art and controls */}
            <div className="w-full md:w-[400px] p-4 md:p-8 md:border-r md:border-neutral-800 flex flex-col">
              {/* Album art */}
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl mb-8">
                <img 
                  src={currentEpisode.image} 
                  alt={currentEpisode.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Controls section */}
              <div className="space-y-4">
                {/* Progress bar and time */}
                <div className="space-y-2">
                  <div className="relative h-1 bg-neutral-800 rounded-full">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={(e) => seek(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div 
                      className="h-full bg-white rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Play and volume controls */}
                <div className="flex items-center justify-between">
                  <button 
                    onClick={togglePlayPause}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-neutral-900 hover:bg-neutral-200 transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                      onMouseEnter={() => setShowVolumeSlider(true)}
                      className="p-2 text-neutral-400 hover:text-white transition-colors"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                    
                    {/* Volume slider popup */}
                    {showVolumeSlider && (
                      <div 
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-4 bg-neutral-800 rounded-lg shadow-lg"
                        onMouseLeave={() => setShowVolumeSlider(false)}
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="w-24 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Episode info (desktop only) */}
            <div className="hidden md:block flex-grow p-8">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-medium text-white mb-4">
                  {currentEpisode.title}
                </h2>
                <p className="text-lg text-neutral-400 mb-6">
                  {currentEpisode.host}
                  {currentEpisode.guest && ` with ${currentEpisode.guest}`}
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  {currentEpisode.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Mini player
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-20 px-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <img 
                  src={currentEpisode.image} 
                  alt={currentEpisode.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <Link 
                  to={`/podcast/${currentEpisode.id}`}
                  className="font-medium text-white line-clamp-1 hover:text-primary-400 transition-colors"
                >
                  {currentEpisode.title}
                </Link>
                <p className="text-sm text-neutral-400 line-clamp-1">
                  {currentEpisode.host}
                  {currentEpisode.guest && ` • ${currentEpisode.guest}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="p-2 text-neutral-400 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-24 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>

              <button 
                onClick={togglePlayPause}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-neutral-900 hover:bg-neutral-200 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
              </button>
              
              <button
                onClick={() => onExpandedChange(true)}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
                aria-label="Expand player"
              >
                <Maximize2 size={20} />
              </button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-1 bg-neutral-800">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniPlayer;