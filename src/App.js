import React from 'react';
import './App.css';
import Tracker from './Tracker';
import "bootstrap/dist/css/bootstrap.min.css"
import Options from "./options";
import {Route, Link, BrowserRouter as Router} from "react-router-dom/modules/BrowserRouter";

function App() {
  return (
    //<Tracker />
      <Options/>
      /*<Router>
          <Route exact Path={"/"} component={Options}/>
          <Route Path={"/tracker"} component={Tracker}/>
      </Router>*/
  );
}

export default App;
