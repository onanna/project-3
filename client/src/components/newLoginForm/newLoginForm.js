
import React, { Component } from "react";
import "./newLoginForm.css";
import SubmitButton from "../submitButton"
import API from "../../utils/API"
// import styles from "./newLoginForm.css"
const $ = window.$;

class Newloginform extends Component {

  componentDidMount=()=>{
    $('.createnewaccount').css('display','none');
  }
  // Setting the component's initial state
  state = {
    createnewaccount: false,
    error:'',
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  };
  
  createnewaccountfunction = event => {
    $('.forColorClear').css('color','#9e9e9e')
    if(this.state.createnewaccount===false){
      this.setState({
        createnewaccount: true,
        error:'', 
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
      })
      this.clearInputs();
    }else{
      this.setState({
        createnewaccount: false,
        error:'',
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
      })
      this.clearInputs();
    }
  };

  clearInputs=()=>{
    $('#firstname').val('')
    $('#lastname').val('')
    $('#email').val('')
    $('#username').val('')
    $('#password').val('')
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
    
    $('.forColorClear').css('color','#9e9e9e')
    this.setState((prevState)=>({
      error:''
    }))

    //if user is logging in normally
    let isError=false
    let newError='';
    if(this.state.createnewaccount===false){
      if(this.state.username.trim().length===0){
        $('#loginUser').css('color','#ff5252')
        isError=true;      
      }
      if(!this.state.password){
        $('#loginPassword').css('color','#ff5252')
        isError=true;       
      }

      if(isError){
        this.setState((prevState)=>({
          error:'Both Fields Are Required'
        }))
      }
    
    //if user is making new account
    }else{
      if(this.state.username.trim().length===0){
        $('#loginUser').css('color','#ff5252')
        newError='All Fields Are Required';
        isError=true;
      }
      if(!this.state.password){
        $('#loginPassword').css('color','#ff5252')
        newError='All Fields Are Required';
        isError=true;       
      }else{
        let confirm = $('#confirmPassword').val();
        if(confirm!=this.state.password){
          isError=true;       
          newError='Passwords Do Not Match'
          $('#loginConfirm').css('color','#ff5252')
        }
      }
      if(!$('#confirmPassword').val()){
        $('#loginConfirm').css('color','#ff5252')
        newError='All Fields Are Required';
        isError=true;        
      }
      if(this.state.email.trim().length===0){
        $('#loginEmail').css('color','#ff5252')
        newError='All Fields Are Required';
        isError=true;        
      }else{
        //verify it's a valid email using regex
        let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email);
        if(!isValidEmail){
          $('#loginEmail').css('color','#ff5252')
          newError='Invalid Email'
          isError=true;        
        }
      }
      if(this.state.firstname.trim().length===0){
        $('#loginFirst').css('color','#ff5252')
        isError=true;        
      }
      if(this.state.lastname.trim().length===0){
        $('#loginLast').css('color','#ff5252')
        isError=true;         
      }

      if(newError.length>0){
        this.setState((prevState)=>({
          error:newError
        }))
      }
    }

    if(!isError){
      //clear the state
      if (this.state.createnewaccount) {
          let newUserLoginInfo={
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            userName:this.state.username,
            password:this.state.password
          }
          
          API.addUser(newUserLoginInfo)
          .then(result=>{
            // alert('result of adding user is: '+ JSON.stringify(result))
            if(result.data.session){
              this.props.setSessionToken(result.data.session,result.data.user);
            }else if(result.data.error){
              this.setState({error:[result.data.error]})
            }
          })
          .catch(result=>{
            alert('error in adding user')
          })
  
      } else {
  
          let userLoginInfo={
            username:this.state.username,
            password:this.state.password
          }
  
          API.getLogin(userLoginInfo)
          .then(res=>{
            if(res.data.error){
              let errors = res.data.error.split('.');
              this.setState({error:errors})
            }else{
              this.props.setSessionToken(res.data.session,res.data.user);
            }
          })
          .catch(error=>{
            console.log("ERROR IS IN loginForm "+error)
          })
      }

    }

  }
  


  render() {

        const style = this.state.createnewaccount ? {display: 'block'} : {display: 'none'};

        return (
          <div>
            <div className="container">

              <header className="col s6 center-align">
                  <a className="btn-small white-text waves-effect waves-light submitbtnclass submitComp" onClick={this.createnewaccountfunction}>{this.state.createnewaccount? 'Go Back to Login': 'Create New Account'}</a>
              </header>

              <div className="row">
                  <div className="col s6 center-align">
                        <div className="card small hoverable newloginclass z-depth-5">
                            <div className="card-content">
                            {/* {
                              this.state.errors.length>0? 
                                <ul className='errorNotice'>
                                  {
                                    this.state.errors.map((current,i)=>{
                                      return <li className='errorMessage'key={i}>{current}</li>
                                    })
                                  }
                                </ul> 
                              : 
                                <div></div>
                            } */}
                            {this.state.error.length>0? <p className='errorMessage'>{this.state.error}</p>:<div></div>}
                            {/* <a class="btn-large waves-effect waves-light z-depth-5 submitbtnclass go-back-btn" onClick={this.createnewaccountfunction}>Create New Account</a> */}

                                {/* This section will appear only when the user clicks the create an account "click here" button */}
                                <div className="createnewaccount" style={style}>
                                  <div className="input-field">
                                    {/* <i className="material-icons prefix">person_outline</i> */}
                                    <input onChange={this.handleInputChange} name="firstname" id="firstname" type="text" />
                                    <label id='loginFirst'className="forColorClear" htmlFor="first_name">First Name</label>
                                  </div>

                                  <div className="input-field">
                                      {/* <i className="material-icons prefix">person</i> */}
                                      <input onChange={this.handleInputChange} name="lastname" id="lastname" type="text" />
                                      <label id='loginLast' className="forColorClear" htmlFor="last_name">Last Name</label>
                                  </div>

                                  <div className="input-field">
                                      {/* <i className="material-icons prefix">email</i> */}
                                      <input onChange={this.handleInputChange} name="email" id="email" type="text" />
                                      <label id='loginEmail'className="forColorClear" htmlFor="email">Email</label>
                                  </div>
                                </div>

                                {/* These fields will appear regardless as they are part of both new account creation and existing user login */}
                                <div className="input-field">
                                    {/* <i className="material-icons prefix">account_box</i> */}
                                    <input onChange={this.handleInputChange} name="username" id="username" type="text" />
                                    <label id='loginUser'className="forColorClear" htmlFor="last_name">Username</label>
                                </div>

                                <div className="input-field">
                                    {/* <i className="material-icons prefix">lock</i> */}
                                    <input onChange={this.handleInputChange} id="password" type="password" name="password" />
                                    <label id='loginPassword'className="forColorClear" htmlFor="last_name">Password</label>
                                </div>

                                {
                                  this.state.createnewaccount?
                                    <div className="input-field">
                                        {/* <i className="material-icons prefix">lock</i> */}
                                        <input id="confirmPassword" type="password" name="password" />
                                        <label id='loginConfirm' className="forColorClear" htmlFor="last_name">Confirm Password</label>
                                    </div>
                                  :
                                    <div></div>                        
                                }

                                <SubmitButton submitFunction={this.handleFormSubmit} />
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