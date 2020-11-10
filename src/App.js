import React from 'react';
import './App.css';
import Tracker from './Tracker';
import "bootstrap/dist/css/bootstrap.min.css"
import Options from "./options";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";

function App() {
    
    return (
        <Router>
            <Switch>
                <Route path="/tracker" children={({location}) => (
                    <Tracker location={location}/>
                )}>
                </Route>
                <Route path="/">
                    <Options/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
