import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';


import MainList from './components/MainList/MainList.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
