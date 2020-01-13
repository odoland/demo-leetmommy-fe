import { useState, FormEvent } from 'react';
import { debounce } from 'lodash';
import LeetMommyAPI, { Doc } from '../services/leetmommyAPI';

const useSearch = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<string[]>([]); // autocomplete
  const [cohort, setCohort] = useState('r14');
  const [results, setResults] = useState<Doc[]>([]); // search

  const getAutocomplete = debounce(
    async (cohort: string, text: string) => {
      const sugg = await LeetMommyAPI.autocomplete(cohort, text)
      setOptions(sugg);
    }, 300);


  const onInputChange = async (evt: any) => {
    const text = evt.target.value;
    setValue(text);

    if (text && text.length > 1) {
      getAutocomplete(cohort, text);
    }
  };

  const onCohortChange = async (evt: any) => {
    setCohort(evt.target.value);
  };

  const onSubmit = async (evt: FormEvent<any>) => {
    evt.preventDefault();
    const searches = await LeetMommyAPI.search(cohort, value);
    setResults(searches);
  };

  return {
    options,
    cohort,
    setCohort,
    results,
    setValue,
    // To bind with input
    bind: {
      value,
      onInputChange,
      onSubmit,
      onCohortChange,
    }
  }
}

export default useSearch;