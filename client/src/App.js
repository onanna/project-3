import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidenav from "./components/sidenav/sidenav";
import StuDirectory from "./pages/studentDirectory";
import Home from "./pages/home"
import "./App.css";

function App() {
  return (
      <Router>
        <div>
          <Sidenav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/students" component={StuDirectory} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
