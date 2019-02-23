import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidenav from "./components/sidenav/sidenav";
import "./App.css";

import Home from "./pages/home"
import NewCourse from "./pages/newCourse/newCourse"
import InstDirectory from "./pages/instructorDirectory"
import StuDirectory from "./pages/studentDirectory";
import Course from "./pages/savedCourse/savedCourse";
import NewInstructor from "./components/newInstructorForm/newInstructorForm";
import Login from "./pages/login";
import Newloginform from "./components/newLoginForm/newLoginForm";

function App() {
  return (
      <Router>
        <div>
          <Sidenav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/api/students" component={StuDirectory} />
            <Route exact path="/api/instructors" component={InstDirectory} />
            <Route exact path="/newcourse" component={NewCourse}  />
            <Route exact path="/newinstructorform" component={NewInstructor}  />
            <Route exact path="/savedcourse" component={Course} />
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/newlogin" component={Newloginform}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
