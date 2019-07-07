import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import CreatePage from './components/CreatePage';
// import VotePage from "./components/VotePage";
// import ResultPage from "./components/ResultPage";
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Header />
      <CreatePage />
    </Fragment>
  </Router>
);

export default App;
