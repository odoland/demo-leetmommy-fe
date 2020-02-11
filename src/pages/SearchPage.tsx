import React, { useLayoutEffect, useState, useCallback } from 'react';
import { useLoading, useSearch } from '../hooks';
import '../styles.css';
import Logo from '../components/Logo';
import SearchForm from '../components/SearchForm';
import { RouteComponentProps } from 'react-router-dom';
import LeetMommyAPI, { Doc } from '../services/leetmommyAPI';
import ResultCard from '../components/ResultCard';
import useQueryParams from '../hooks/useQueryParams';
import RadioButtons from '../components/RadioButtons';

const loading = require('../logos/loading.gif');

/**
 * Main page to display all the results 
 */
const SearchPage: React.FC<RouteComponentProps> = (props) => {
  const isLoading = useLoading();
  const {query, cohort, setQueryParams} = useQueryParams();
  const [results, setResults] = useState<Doc[]>([]);
  const { inputProps : { onCohortChange} } = useSearch();
  
  // useLayoutEffect over useEffect to prevent flicker
  useLayoutEffect(() => {
    const getSearchResults = async () => {
      const res: Doc[] = await LeetMommyAPI.search(cohort, query);
      setResults(res);
    };
    getSearchResults();
  }, [cohort, query]);

  const renderResults = useCallback((documents: Doc[]) => documents.map((doc: Doc, i: number) => {
    return (
      <ResultCard key={i} doc={doc} />
    )
  }), []);

  return (
    <div>
      <div className="Search-Page">
        <div className="Center-Container" style={{ margin: 10 }}>
          <Logo width="200px" height="100px" />
        </div>
        <div className="Center-Container">
        <SearchForm />
        </div>
      </div>
      <hr></hr>
      {(isLoading) ?
        (
          <div className="Center-Container">
            <p> Waking up heroku...</p>
            <img alt="loader" src={loading} />
          </div>
        ) :
        <div>
          <div className="Center-Container">
          <RadioButtons cohort={cohort} onCohortChange={(evt) => {
            onCohortChange(evt);
            setQueryParams(query, evt.target.value);
          }} />
          </div>
          <p className="Result-Count"> Found {results.length} result(s) in {cohort} for "{query}" </p>
          {renderResults(results)}
        </div>
      }
    </div >
  )
}

export default SearchPage;