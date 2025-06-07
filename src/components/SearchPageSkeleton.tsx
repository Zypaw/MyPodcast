import React from 'react';
import Skeleton from './ui/Skeleton';

const SearchPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-neutral-900">
      <div className="container mx-auto px-4">
        {/* Search Input Skeleton */}
        <div className="max-w-2xl mx-auto mb-16">
          <Skeleton className="h-12 w-full rounded-full mb-4" />
          <div className="flex flex-wrap gap-2 justify-center">
            {[...Array(6)].map((_, index) => (
              <Skeleton
                key={index}
                className="h-8 w-24 rounded-full"
                variant="rectangular"
              />
            ))}
          </div>
        </div>

        {/* Results Skeleton */}
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-8 w-48 mb-8" variant="text" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton variant="text" className="h-4 w-20" />
                    <Skeleton variant="text" className="h-4 w-16" />
                  </div>
                  <Skeleton variant="text" className="h-6 w-3/4 mb-2" />
                  <Skeleton variant="text" className="h-4 w-full mb-3" />
                  <div className="flex gap-2">
                    <Skeleton variant="rectangular" className="h-6 w-16 rounded-full" />
                    <Skeleton variant="rectangular" className="h-6 w-20 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPageSkeleton; 