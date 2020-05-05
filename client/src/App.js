import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home.js';
import { Security, SecureRoute, ImplicitCallBack } from '@okta/okta-react'


class App extends Component {
  render() {
    return (      
      <div>
        <Switch>
          <Route exact path='/' render={()=> <Home/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;