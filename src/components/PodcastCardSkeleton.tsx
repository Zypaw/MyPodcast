import React from 'react';
import Skeleton from './ui/Skeleton';

const PodcastCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="relative h-48">
        <Skeleton className="w-full h-full" />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Skeleton variant="text" className="h-4 w-20" />
          <Skeleton variant="text" className="h-4 w-16" />
        </div>
        
        <Skeleton variant="text" className="h-6 w-3/4 mb-2" />
        <Skeleton variant="text" className="h-4 w-full mb-3" />
        
        <div className="flex flex-wrap gap-2">
          <Skeleton variant="rectangular" className="h-6 w-16 rounded-full" />
          <Skeleton variant="rectangular" className="h-6 w-20 rounded-full" />
          <Skeleton variant="rectangular" className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PodcastCardSkeleton; 