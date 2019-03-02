import React, { Component } from "react";
import API from "../utils/API"
import NewLoginForm from "../components/newLoginForm/newLoginForm"
import styles from "./login.css"


class Login extends Component{
    
    render(){
        return(
        <div className="container">

            <header>
                <h1>Course Creator</h1>
                <h3>Your Learning Managment Resource</h3>
                <p>Access to this site requires a login</p>
            </header>
            <div className="scale-out">
            <NewLoginForm />
            </div>
            <br></br>
        </div>
        )
    }
}

export default Login;