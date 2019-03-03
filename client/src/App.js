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
import API from "./utils/API";
import Loader from 'react-loader-spinner'
import "./App.css";
const $ = window.$;
// import { Z_FIXED } from "zlib";
// import { AutoComplete } from "material-ui";
// import TouchRipple from "material-ui/internal/TouchRipple";

class App extends Component{
  
  state={
    token:'',
    isLoading:false,
    isHome:true
  }
  
  componentDidMount=()=>{

    let currentPath = window.location.pathname.split('/');
    if (currentPath[1]==='attendance' && currentPath[2]==='temp362019'){
      this.checkToken(currentPath[3])
    }
    
    if(localStorage.getItem("course-creator-token")){
      let token=localStorage.getItem("course-creator-token");
      console.log("token found in local storage "+token)
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

      this.setState((previousState)=>({
        token: result.data._id,
        isLoading:false
      }));
    })
    .catch(err=>alert("error! "+err))
  }
  setSessionToken=(session)=>{
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
      // let counter=0;
      // let fadeIn = setInterval(()=>{
      //   $("body").css('opacity',`0.${counter}`)
      //   counter++
      //   if(counter===9) clearInterval(fadeIn);
      // },50)
      $("body").fadeIn(300)
      return (
          <Router>
            <div>
              <Sidenav deleteToken={this.deleteToken} />
              <Switch>
                <Route exact path="/" component={AllCourses} />
                <Route exact path="/students/all" component={StuDirectory} />
                {/* <Route exact path="/students/detail" component={Student} /> */}
                <Route exact path="/instructors/all" component={InstDirectory} />            
                {/* <Route exact path="/instructors/detail" component={Instructor} /> */}
                <Route exact path="/courses/detail/:id" render={(props)=><Course {...props} token={this.state.token}/>} />
                <Route exact path="/attendance/temp362019/:token/:courseId" component={AttendanceForm} />
                
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
