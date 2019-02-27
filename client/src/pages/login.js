import React, { Component } from "react";
import API from "../utils/API"
import NewLoginForm from "../components/newLoginForm/newLoginForm"


// class Login extends Component{
function Login(props){
    // constructor(){
    //     super()
        console.log("login props are "+JSON.stringify(props))
    // }
    
    // render(){
        return(
        <div>
            <nav>
                <ul>
                    <li><a href="/">Homepage</a></li>
                    <li><a href="/auth/newlogin">Create Account</a></li>
                    <li><a href="/auth/logout">Logout</a></li>
                    <li><a href="/auth/login">Login</a></li>
                </ul>
            </nav>
            <header>
                <h2>Login using...</h2>
            </header>
            <a className="user-id-btn" href="/auth/userid">User ID</a><br></br>
            <a className="google-btn" href="/auth/google">Google+</a><br></br>
            <a className="facebook-btn" href="/auth/facebook">Facebook</a><br></br>
            <a className="create-new-btn" href="/auth/newlogin">Create Account</a>

            <NewLoginForm loginUpdate={props.loginUpdate}/>
        </div>
        )
    // }
}

export default Login;