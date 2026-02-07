import { useEffect, useState } from 'react';

export const useTabletView = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1050px)');
    const handleMediaChange = (e) => setIsTablet(e.matches);

    setIsTablet(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  return isTablet;
};
