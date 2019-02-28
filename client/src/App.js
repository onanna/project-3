import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidenav from "./components/sidenav/sidenav";
import "./App.css";
import AllCourses from "./pages/courseDirectory"
import NewCourse from "./pages/newCourse/newCourse"
import InstDirectory from "./pages/instructorDirectory"
import StuDirectory from "./pages/studentDirectory";
import Attendance from "./pages/attendanceForm"
import Courses from "./pages/courseDirectory"
import "./App.css";
import Course from "./pages/savedCourse/savedCourse";
import NewInstructor from "./components/newInstructorForm/newInstructorForm";
import Login from "./pages/login";
import NewLoginform from "./components/newLoginForm/newLoginForm";
import API from "./utils/API";
import Loader from 'react-loader-spinner'
import { Z_FIXED } from "zlib";
import { AutoComplete } from "material-ui";
import TouchRipple from "material-ui/internal/TouchRipple";

class App extends Component{
  
  state={
    token:'',
    isLoading:false
  }
  
  componentDidMount=()=>{
    if(localStorage.getItem("course-creator-token")){
      let token=localStorage.getItem("course-creator-token");
      console.log("token found in local storage "+token)
      this.checkToken(token);
    }
  }

  checkToken=(token)=>{
    this.setState((prevState)=>({
      isLoading:true 
    }))
    API.checkToken(token)
    .then(result=>{
      // alert("TOKEN SEARCHED. RESULT IS "+JSON.stringify(result.data))
      this.setState((previousState)=>({
        token: result.data._id,
        isLoading:false
      }));
    })
    .catch(err=>alert("error! "+err))
  }
  setSessionToken=(session)=>{
      // alert("SETTING SESSION TOKEN! to "+JSON.stringify(session))
      localStorage.setItem('course-creator-token', session._id)
      
      this.setState((previousState)=>({
        token:session,
        isLoading:false
      }));  
  }
  deleteToken=()=>{
    let token = localStorage.getItem("course-creator-token");
    API.deleteToken(token)
    .then(result=>{
    })
    localStorage.removeItem("course-creator-token")

    // alert("about to set state to empty")
    this.setState((prevState)=>({
      token:''
    }))
  }

  render(){

    // if(!this.state.token){
    if(this.state.token==="" && !this.state.isLoading){
      return <Login setSessionToken={this.setSessionToken}/>
    }

    if(this.state.isLoading===true){

      return(
        <div className="row">
          <div className="spinnerDiv col s12 center-align">
            <Loader type="Oval" color="#0d47a1"/>
          </div>
        </div>
      )
    }
    
    if(this.state.token && this.state.isLoading===false){
      return (
          <Router>
            <div>
              <Sidenav deleteToken={this.deleteToken} />
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
