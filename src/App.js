import React from 'react';
import './App.css';
import Tracker from './Tracker';
import "bootstrap/dist/css/bootstrap.min.css"
import Options from "./options";
import {Route, Link, BrowserRouter as Router, Switch} from "react-router-dom";

function App() {
    return (
        //<Tracker />
        //<Options/>
        <Router>
            <Switch>
                <Route path="/tracker" component={Tracker}/>
                <Route path="/" component={Options}/>
            </Switch>
        </Router>
    );
}

export default App;
