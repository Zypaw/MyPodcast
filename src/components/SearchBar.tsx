import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (topics: string[]) => void;
  availableTopics: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onFilterChange, 
  availableTopics 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const handleTopicToggle = (topic: string) => {
    const updatedTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter(t => t !== topic)
      : [...selectedTopics, topic];
    
    setSelectedTopics(updatedTopics);
    onFilterChange(updatedTopics);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };
  
  const clearFilters = () => {
    setSelectedTopics([]);
    onFilterChange([]);
  };
  
  return (
    <div className="bg-neutral-800 rounded-xl shadow-md p-4 mb-8">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center border-2 border-neutral-700 rounded-lg focus-within:border-primary-500 transition-colors">
          <div className="pl-4 text-neutral-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search episodes, topics, or guests..."
            className="flex-1 py-3 px-4 outline-none text-white bg-transparent placeholder:text-neutral-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="pr-4 text-neutral-400 hover:text-neutral-300"
              aria-label="Clear search"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm text-primary-400 hover:text-primary-300 font-medium"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            Search
          </button>
        </div>
      </form>
      
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-neutral-700 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-white">Filter by Topics</h3>
            {selectedTopics.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-neutral-400 hover:text-neutral-300"
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {availableTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicToggle(topic)}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  selectedTopics.includes(topic)
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-700 text-neutral-200 hover:bg-neutral-600'
                } transition-colors`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;