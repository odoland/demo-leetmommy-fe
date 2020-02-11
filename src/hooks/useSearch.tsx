import { useState } from 'react';
import { debounce } from 'lodash';
import LeetMommyAPI from '../services/leetmommyAPI';
import { Cohort } from '../config';


/**
 * Custom hook for state related to search 
 * @param defaultCohort Default cohort to start search with
 * @returns
 * 
 */
const useSearch = (defaultCohort: Cohort ='r14') => {
  const [value, setValue] = useState<string>('');
  const [cohort, setCohort] = useState<Cohort>(defaultCohort);
  const [autocomplete, setAutocomplete] = useState<string[]>([]); 

  const getAutocomplete = debounce(
    async (cohort: string, text: string) => {
      const sugg = await LeetMommyAPI.autocomplete(cohort, text);
      setAutocomplete(sugg);
    }, 300);


  
  const onInputChange = async (evt: any) => {
    const text = evt.target.value;
    setValue(text);

    const hasText = text && text.length > 1;
    if (hasText) {
      getAutocomplete(cohort, text);
    }
  };

  const onCohortChange = async (evt: any) => {
    setCohort(evt.target.value);
  };

  return {
    autocomplete, // suggestions
    cohort,
    setCohort,
    setValue,

    // Props to bind with input
    inputProps: {
      value,
      onInputChange,
      onCohortChange,
    }
  }
}

export default useSearch;