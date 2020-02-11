import React from 'react';
import { useLoading } from '../hooks';
import '../styles.css';
import Logo from '../components/Logo';
import SearchForm from '../components/SearchForm';
import { RouteComponentProps } from 'react-router-dom';

const loading = require('../logos/loading.gif');

/**
 * Just some wannabe search engine's main home page 
 */
const Home: React.FC<RouteComponentProps> = (props) => {
  const isLoading = useLoading();

  if (isLoading) {
    return (
      <div className="Center-Col-Container">
        <div> Waiting for heroku servers ... </div>
        <img alt="loader" src={loading} />
      </div>
    )
  };
  return (
    <div className="Home-Page">
      <Logo />
      <SearchForm button radio />
    </div>

  )
}

export default Home;