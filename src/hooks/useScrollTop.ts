import { useCallback } from 'react';

export const useScrollTop = () => {
  return useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
}; 