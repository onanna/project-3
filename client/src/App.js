import React, {Component} from "react";
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
import NewLoginform from "./components/newLoginForm/newLoginForm";
import API from "./utils/API";

class App extends Component{
  
  state={
    token:'',
    isLoggedIn:false
  }
  
  componentDidMount=()=>{
    if(localStorage.getItem("course-creator-token")){
      let token=localStorage.getItem("course-creator-token");

      //check database for token

      this.setState({token: token})
    }
  }

  setSessionToken=(session)=>{
    alert("SETTING SESSION TOKEN!!")
    this.setState({
      token:session._id,
      isLoggedIn:true
    })
    
  }

  render(){

    if(!this.state.token){
      return <Login loginUpdate={(token)=>this.setSessionToken(token)}/>
    }else{
      return (
          <Router>
            <div>
              {/* <Sidenav /> */}
              <Switch>
                <Route exact path="/" component={AllCourses} />
                {/* <Route path="/login" component={Login} /> */}
                {/* <Route exact path="/user/new" component={NewLoginform}/> */}
                
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
  }
}

export default App;
