
import React, { Component } from "react";
import "./newLoginForm.css";
import SubmitButton from "../submitButton"
import API from "../../utils/API"
import styles from "./newLoginForm.css"
const $ = window.$;

class Newloginform extends Component {

  // constructor(props){
  //   super(props);
  //   console.log("props are "+JSON.stringify(this.props))
  // }

  componentDidMount=()=>{
    $('.createnewaccount').css('display','none');
  }
  // Setting the component's initial state
  state = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    email:"",
    createnewaccount: false
  };
  
  addNewUser=()=>{
    
    let newUser={
        name:"newCdfosdsfurse2",
        startDate:new Date(),
        endDate: new Date(),
        startTime:"no",
        endTime:"10pm",
        numberOfSeats:9,
        location:"heyyy at newark nj",
        instructors:[],
        students:[]
    }
    API.addUser(newUser)
        .then((response)=>{
            let tempCourses=this.state.allCourses;
            tempCourses.push(response.data);
            this.setState({allCourses:tempCourses})
        })
        .catch(err => console.log(err));
}

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
   event.preventDefault();

      if (this.state.createnewaccount) {
          console.log("entering handleFormSubmit with createnewaccount = true") 
          let newUserLoginInfo={
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            username:this.state.username,
            password:this.state.password
          }
          
          API.addUser(newUserLoginInfo)
          console.log(newUserLoginInfo)
          console.log(this.state.allUsers)

      } else {
                let userLoginInfo={
                  username:this.state.username,
                  password:this.state.password
                }

                  // console.log(userLoginInfo)
                  API.submitUserLogin(userLoginInfo)
                  .then(res=>{

                    if(res.data.error){
                      console.log("error is"+JSON.stringify(res.data.error))
                    }else{
                      console.log("session id is "+JSON.stringify(res.data._id))
                      this.props.setSessionToken(res.data);
                    }
                  })
                  .catch(error=>{
                    console.log("ERROR IS IN loginForm "+error)
                  })

              }}
  
createnewaccountfunction = event => {
  console.log("clicked on create new account")
  this.setState({createnewaccount: true})
  
};

  render() {

        const style = this.state.createnewaccount ? {display: 'block'} : {display: 'none'};

        return (
          <div>
            <div className="container">

                      <header className="col s6 center-align">
                          <a className="btn-small white-text waves-effect waves-light submitbtnclass submitComp" onClick={this.createnewaccountfunction}>Create New Account</a>
                      </header>

                <div className="row">
                    <div className="col s6 center-align">
                          <div className="card hoverable newloginclass z-depth-5">
                              <div className="card-content">
                              {/* <a class="btn-large waves-effect waves-light z-depth-5 submitbtnclass go-back-btn" onClick={this.createnewaccountfunction}>Create New Account</a> */}

                                  {/* This section will appear only when the user clicks the create an account "click here" button */}
                                  <div className="createnewaccount" style={style}>
                                    <div className="input-field">
                                      <i className="material-icons prefix">person_outline</i>
                                      <input onChange={this.handleInputChange} name="username" id="username" type="text" />
                                      <label className="active" htmlFor="first_name">First Name</label>
                                    </div>

                                    <div className="input-field">
                                        <i className="material-icons prefix">person</i>
                                        <input onChange={this.handleInputChange} name="lastname" id="lastname" type="text" />
                                        <label className="active" htmlFor="last_name">Last Name</label>
                                    </div>

                                    <div className="input-field">
                                        <i className="material-icons prefix">email</i>
                                        <input onChange={this.handleInputChange} name="email" id="email" type="text" />
                                        <label className="active" htmlFor="email">Email</label>
                                    </div>
                                  </div>

                                  {/* These fields will appear regardless as they are part of both new account creation and existing user login */}
                                  <div className="input-field">
                                      <i className="material-icons prefix">account_box</i>
                                      <input onChange={this.handleInputChange} name="username" id="username" type="text" />
                                      <label className="active" htmlFor="last_name">Username</label>
                                  </div>

                                  <div className="input-field">
                                      <i className="material-icons prefix">lock</i>
                                      <input onChange={this.handleInputChange} id="lastName" type="password" name="password" />
                                      <label className="active" htmlFor="last_name">Password</label>
                                  </div>
                                  

                                  <SubmitButton submitFunction={this.handleFormSubmit} />

                                  {/* <a class="btn-large waves-effect waves-light z-depth-5 submitbtnclass go-back-btn" onClick={this.toggleView}>Need a login?</a> */}

                              </div>
                          </div>
                      </div>
                </div>
            </div>
          </div>
        );
    }
}


export default Newloginform;