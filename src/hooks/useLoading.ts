import { useState, useEffect } from 'react';
import LeetMommyAPI from '../services/leetmommyAPI';

/**
 * Hook for getting the loading state of the LeetMommy backend
 */
const useLoading = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {

    const wakeUp = async () => {
      await LeetMommyAPI.ping();
      setLoading(false);
    }
    wakeUp();

  }, []);

  return isLoading;
};

export default useLoading;