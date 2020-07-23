import { useState, useEffect } from 'react';
import 'intersection-observer';

export const useOnlineDetector = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
    return () => {
      window.removeEventListener('online');
      window.removeEventListener('offline');
    };
  }, [isOnline]);

  return [isOnline];
};
