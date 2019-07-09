import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import CreatePage from './components/CreatePage';
import './App.css';
// import VotePage from "./components/VotePage";
// import ResultPage from "./components/ResultPage";

const App = () => (
  <Router>
    <Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={CreatePage} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
