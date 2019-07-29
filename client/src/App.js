import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import CreatePage from './components/CreatePage';
import VotePage from './components/VotePage';
import ResultsPage from './components/ResultsPage';
import NotFoundPage from './components/NotFoundPage';
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={CreatePage} />
        <Route path='/VotePage/:id' component={VotePage} />
        <Route path='/ResultsPage/:id' component={ResultsPage} />
        <Route path='/NotFoundPage' component={NotFoundPage} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
