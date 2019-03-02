import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidenav from "./components/sidenav/sidenav";
import "./App.css";
import BackgroundLogin from "./images/bookAppleRed.jpg"
import MainPages from "./images/flipped_2.jpg"
import AllCourses from "./pages/courseDirectory"
import NewCourse from "./pages/newCourse/newCourse"
import InstDirectory from "./pages/instructorDirectory"
import StuDirectory from "./pages/studentDirectory";
import Course from "./pages/savedCourse/savedCourse";
import NewInstructor from "./components/newInstructorForm/newInstructorForm";
import Login from "./pages/login";
import NewLoginform from "./components/newLoginForm/newLoginForm";


function App() {
  let locationUrl = window.location.pathname === "/login"

  let styles = locationUrl 
    ? { backgroundImage: `url(${BackgroundLogin})`, backgroundRepeat: 'noRepeat', backgroundPosition: 'center center', backgroundSize: 'cover', color: 'rgb(203, 218, 218)', fontFamily: 'Courier', textAlign: 'center'} : {}
    
  return (
      <Router>
        <div className="app-container" style={styles}>
          {/* <Sidenav /> */}
          <Switch>
            <Route exact path="/" component={AllCourses} />
            <Route path="/login" component={Login} />
            <Route exact path="/user/new" component={NewLoginform}/>
            
            {/* <Route exact path="/api/students" component={StuDirectory} /> */}
            {/* <Route exact path="/api/instructors" component={InstDirectory} /> */}
            {/* <Route exact path="/savedcourse" component={Course} />   */}

            <Route exact path="/students/all" component={StuDirectory} />
            {/* <Route exact path="/students/:id" component={StuDirectory} /> */}
            <Route exact path="/instructors/all" component={InstDirectory} />            
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
