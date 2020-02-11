import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" render={(rtProps) => <Home {...rtProps} />} />
      <Route path="/search" render={(rtProps) => <SearchPage {...rtProps}/>} />
    </BrowserRouter>
  );
}

export default App;
