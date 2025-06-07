import React from 'react';
import Skeleton from './ui/Skeleton';

const PodcastDetailsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Image Skeleton */}
              <div className="w-full md:w-1/3">
                <Skeleton className="w-full aspect-square rounded-xl" />
              </div>
              
              {/* Content Skeleton */}
              <div className="w-full md:w-2/3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {[...Array(3)].map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-6 w-20"
                      variant="rectangular"
                    />
                  ))}
                </div>
                
                <Skeleton className="h-10 w-3/4 mb-4" variant="text" />
                
                <div className="flex flex-wrap gap-4 text-neutral-400 mb-6">
                  <Skeleton className="h-6 w-32" variant="text" />
                  <Skeleton className="h-6 w-24" variant="text" />
                </div>
                
                <Skeleton className="h-24 w-full mb-6" variant="rectangular" />
                
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32 rounded-full" />
                  <Skeleton className="h-12 w-32 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Episodes Skeleton */}
          <div className="mt-16">
            <Skeleton className="h-8 w-48 mb-8" variant="text" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-neutral-800 rounded-xl p-4">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
                  <Skeleton className="h-4 w-full mb-4" variant="text" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastDetailsSkeleton; 