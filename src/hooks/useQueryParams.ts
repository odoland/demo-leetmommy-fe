import { useLocation, useHistory } from 'react-router-dom';
import { Cohort } from '../config';

/**
 * Custom hook for setting using query parameters in the React url for search and cohort
 */
const useQueryParams = () => {

  const location = useLocation();
  const URLParams = new URLSearchParams(location.search);

  const query = URLParams.get('q') as string;
  const cohort = URLParams.get('cohort') as Cohort;
 
  const history = useHistory();

  /**
   * Sets query parameters by adding onto URL before push 
   */ 
  const setQueryParams = (qry: string, coh: string) => {
    const queryString = new URLSearchParams({ q: qry, cohort: coh }).toString();
    history.push('/search?' + queryString);
  };

  return { query, cohort, setQueryParams };
}

export default useQueryParams;