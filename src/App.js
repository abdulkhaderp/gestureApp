import React, { Component } from 'react';
import {BrowserRouter as Router , Route,Redirect,Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import TextToSpeech from './components/TextToSpeech';

import './App.css';
class App extends Component {
  render() {
    return (
    <Router basename="/">
     
      <div className="row app-wrapper overflow-hidden">
        {/* <Loader/>
        <Error/>
        <CommonErrorPopup/>
        <ErrorBoundary> */}
        <Switch>
          <Route path="/home" component={Home} exact/>
          <Route path="/textToSpeech" component={TextToSpeech} exact/>
          <Route path="/login" component={Login} exact/>
        
          <Route path="" component={Login}  exact/>

          {/* <Route path="" component={Home}  exact/> */}
          
        </Switch>
        {/* </ErrorBoundary> */}
      </div>
    </Router>
    );
  }
}
 
export default App;
 