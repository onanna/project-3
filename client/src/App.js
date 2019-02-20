import React from "react";
import Newcourse from "./components/newcourse/newcourse"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidenav from "./components/sidenav/sidenav";
import InstDirectory from "./pages/instructorDirectory"
import StuDirectory from "./pages/studentDirectory";
import Home from "./pages/home"
import "./App.css";
import Course from "./components/savedCourse/savedCourse";

function App() {
  return (
      <Router>
        <div>
          <Sidenav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/students" component={StuDirectory} />
            <Route exact path="/instructors" component={InstDirectory} />
            <Route  exact path="/newcourse" component={Newcourse}  />
            <Route exact path="/savedCourse" component={Course} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
