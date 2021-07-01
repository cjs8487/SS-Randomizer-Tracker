import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tracker from './Tracker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Options from './Options';
import FullAcknowledgement from './FullAcknowledgement';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/tracker" component={Tracker} />
                <Route path="/acknowledgement" component={FullAcknowledgement} />
                <Route path="/">
                    <Options />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
