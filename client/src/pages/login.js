import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer/index"
import API from "../utils/API"

class Login extends Component{
    render(){
        return(
            <Pagecontainer>
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
        <a class="user-id-btn" href="/auth/userid">User ID</a><br></br>
        <a class="google-btn" href="/auth/google">Google+</a><br></br>
        <a class="facebook-btn" href="/auth/facebook">Facebook</a><br></br>
        <a class="create-new-btn" href="/auth/newlogin">Create Account</a>
        </div>
            </Pagecontainer>
        )
    }
}

export default Login;