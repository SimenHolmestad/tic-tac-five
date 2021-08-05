import React from 'react';
import Game from './components/Game';
import Menu from './components/Menu';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/play/:gameId/:playType' component={ Game }/>
        <Route path='/' component={ Menu }/>
      </Switch>
    </Router>
  );
}

export default App;
