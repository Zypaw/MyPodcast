import React, { createContext, useState, useContext, useEffect } from 'react';
import { PodcastEpisode } from '../data/podcasts';

interface AudioContextType {
  currentEpisode: PodcastEpisode | null;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  playEpisode: (episode: PodcastEpisode) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  formatTime: (time: number) => string;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);

  useEffect(() => {
    const audio = new Audio();
    setAudioElement(audio);

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioElement && currentEpisode) {
      audioElement.src = currentEpisode.audioUrl;
      audioElement.load();
      if (isPlaying) {
        audioElement.play()
          .catch(error => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [currentEpisode, audioElement]);

  useEffect(() => {
    if (audioElement) {
      audioElement.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audioElement]);

  const playEpisode = (episode: PodcastEpisode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!audioElement || !currentEpisode) return;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play()
        .catch(error => {
          console.error("Error playing audio:", error);
        });
    }
    
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    if (audioElement) {
      audioElement.currentTime = time;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (audioElement) {
      setVolume(newVolume);
      if (isMuted && newVolume > 0) {
        setIsMuted(false);
      }
    }
  };

  const handleToggleMute = () => {
    if (audioElement) {
      if (!isMuted) {
        setPreviousVolume(volume);
        setIsMuted(true);
      } else {
        setVolume(previousVolume);
        setIsMuted(false);
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        duration,
        currentTime,
        volume,
        isMuted,
        playEpisode,
        togglePlayPause,
        seek,
        setVolume: handleVolumeChange,
        toggleMute: handleToggleMute,
        formatTime
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};