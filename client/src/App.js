import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidenav from "./components/sidenav/sidenav";
import "./App.css";

import AllCourses from "./pages/courseDirectory"
import NewCourse from "./pages/newCourse/newCourse"
import InstDirectory from "./pages/instructorDirectory"
import StuDirectory from "./pages/studentDirectory";
import Course from "./pages/savedCourse/savedCourse";
import NewInstructor from "./components/newInstructorForm/newInstructorForm";
import Login from "./pages/login";

function App() {
  return (
      <Router>
        <div>
          <Sidenav />
          <Switch>
            <Route exact path="/" component={AllCourses} />
            <Route exact path="/auth/login" component={Login} />
            
            {/* <Route exact path="/api/students" component={StuDirectory} /> */}
            {/* <Route exact path="/api/instructors" component={InstDirectory} /> */}
            {/* <Route exact path="/savedcourse" component={Course} />   */}

            <Route exact path="/all-students" component={StuDirectory} />
            {/* <Route exact path="/students/:id" component={StuDirectory} /> */}
            <Route exact path="/all-instructors" component={InstDirectory} />            
            {/* <Route exact path="/instructors/:id" component={InstDirectory} /> */}
            {/* <Route exact path="/courses" component={Course} /> */}
            <Route exact path="/courses/detail/:id" component={Course} />
            {/* <Route exact path="/courses/detail/attendance/:date" component={Attendance} /> */}
            
            <Route exact path="/newcourse" component={NewCourse}  />
            <Route exact path="/newinstructorform" component={NewInstructor}  />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
