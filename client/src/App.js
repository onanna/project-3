import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidenav from "./components/sidenav/sidenav";
import AllCourses from "./pages/courseDirectory"
import NewCourse from "./pages/newCourse/newCourse"
import InstDirectory from "./pages/instructorDirectory"
import StuDirectory from "./pages/studentDirectory";
import AttendanceForm from "./pages/attendanceForm/attendanceForm"
import Course from "./pages/savedCourse/savedCourse";
import NewInstructor from "./components/newInstructorForm/newInstructorForm";
import Login from "./pages/login/login";
import UserProfile from './pages/userProfile/userProfile'
import API from "./utils/API";
import Loader from 'react-loader-spinner'
import "./App.css";
const $ = window.$;
// import { Z_FIXED } from "zlib";
// import { AutoComplete } from "material-ui";
// import TouchRipple from "material-ui/internal/TouchRipple";

let isAttendance=false;
let courseToGetAttendanceFor='';

class App extends Component{
  
  state={
    token:'',
    isLoading:false,
    isHome:true,
    user:{}
  }
  
  componentDidMount=()=>{

    //special check if this is an attendance form. if it is, use the 3rd parameter as the token to search
    let currentPath = window.location.pathname.split('/');
    if (currentPath[1]==='attendance' && currentPath[2]==='temp362019'){
      isAttendance=true;
      courseToGetAttendanceFor=currentPath[4]
      this.checkToken(currentPath[3])
    }
    
    //check if there is a token in local storage. if there is, check it against database
    if(localStorage.getItem("course-creator-token")){
      let token=localStorage.getItem("course-creator-token");
      this.checkToken(token);
    }else{
      // window.location.replace('/')
    }
  }

  checkToken=(token)=>{
    this.setState((prevState)=>({
      isLoading:true 
    }))
    API.checkToken(token)
    .then(result=>{

      $("body").hide()

      if(result.data.session){
        this.setState((previousState)=>({
          token: result.data.session._id,
          user:result.data.user,
          isLoading:false
        }));
      }else{
        this.setState((previousState)=>({
          isLoading:false
        }));
      }
    })
    .catch(err=>{
      // alert("error! "+err)
      // this.setState((previousState)=>({
      //   isLoading:false
      // }));
    })
  }
  setSessionToken=(session,userData)=>{
      localStorage.setItem('course-creator-token', session._id)      
      this.setState((previousState)=>({
        token:session,
        isLoading:false,
        user:userData
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

    if(!this.state.token && !this.state.isLoading){
      $("body").fadeIn(500)
      return (
        <Login setSessionToken={this.setSessionToken}/>
      )
    }

    if(this.state.token==="" && !this.state.isLoading){
      return (
        <Login setSessionToken={this.setSessionToken}/>
      )
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
    if(isAttendance===true){
      $("body").fadeIn(300)
      return(
        <AttendanceForm deleteToken={this.deleteToken} courseId={courseToGetAttendanceFor} />
      )
    }
    
    if(this.state.token && this.state.isLoading===false){
      $("body").fadeIn(300)
      return (
          <Router>
            <div>
              <Sidenav userName={this.state.user.userName} deleteToken={this.deleteToken} />
              <Switch>
                <Route exact path="/" component={AllCourses} />
                <Route exact path="/profile" render={(props)=><UserProfile {...props} user={this.state.user}/>} />
                
                <Route exact path="/students/all" component={StuDirectory} />
                {/* <Route exact path="/students/detail" component={Student} /> */}
                <Route exact path="/instructors/all" component={InstDirectory} />            
                {/* <Route exact path="/instructors/detail" component={Instructor} /> */}
                <Route exact path="/courses/detail/:id" render={(props)=><Course {...props} token={this.state.token}/>} />
                {/* <Route exact path="/attendance/temp362019/:token/:courseId" component={AttendanceForm} /> */}
                
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
