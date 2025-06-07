import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { podcastEpisodes, PodcastEpisode } from '../data/podcasts';
import PodcastCard from '../components/PodcastCard';
import SearchBar from '../components/SearchBar';
import SearchPageSkeleton from '../components/SearchPageSkeleton';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const initialTopic = searchParams.get('topic') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    initialTopic ? [initialTopic] : []
  );
  const [filteredEpisodes, setFilteredEpisodes] = useState<PodcastEpisode[]>(podcastEpisodes);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get all unique topics
  const allTopics = Array.from(
    new Set(podcastEpisodes.flatMap(episode => episode.topics))
  ).sort();
  
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter episodes based on search query and selected topics
    let results = podcastEpisodes;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        episode => 
          episode.title.toLowerCase().includes(query) || 
          episode.description.toLowerCase().includes(query) ||
          (episode.guest && episode.guest.toLowerCase().includes(query)) ||
          episode.host.toLowerCase().includes(query)
      );
    }
    
    if (selectedTopics.length > 0) {
      results = results.filter(
        episode => selectedTopics.some(topic => episode.topics.includes(topic))
      );
    }
    
    setFilteredEpisodes(results);
    
    // Update URL params
    const params: { [key: string]: string } = {};
    if (searchQuery) params.query = searchQuery;
    if (selectedTopics.length === 1) params.topic = selectedTopics[0];
    
    setSearchParams(params);
  }, [searchQuery, selectedTopics, setSearchParams]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleFilterChange = (topics: string[]) => {
    setSelectedTopics(topics);
  };
  
  if (isLoading) {
    return <SearchPageSkeleton />;
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            {searchQuery || selectedTopics.length > 0 
              ? 'Search Results' 
              : 'Discover Episodes'
            }
          </h1>
          <p className="text-neutral-400">
            {searchQuery || selectedTopics.length > 0 
              ? `Showing ${filteredEpisodes.length} episode${filteredEpisodes.length !== 1 ? 's' : ''}` 
              : 'Browse our entire collection of podcast episodes'
            }
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-8">
          <SearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            availableTopics={allTopics}
          />
        </div>
        
        {filteredEpisodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEpisodes.map(episode => (
              <PodcastCard key={episode.id} episode={episode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-white mb-2">No episodes found</h3>
            <p className="text-neutral-400">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;