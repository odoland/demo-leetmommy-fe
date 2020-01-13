import { useState, useEffect } from 'react';
import LeetMommyAPI from '../services/leetmommyAPI';

/**
 * Hook for getting the loading state of the LeetMommy backend
 */
const useLoading = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    const wakeUp = async () => {
      const { ping } = await LeetMommyAPI.ping();
      if (ping) {
        setLoading(ping);
      };
    }
    wakeUp();

  }, []);

  return isLoading;
};

export default useLoading;