import React, { Component } from "react";
import API from "../utils/API"
import NewLoginButton from "../components/newLoginButton/newLoginButton.js"


class Login extends Component{

    // componentDidMount=()=>{
    //     // API.getLogin()
    //     //     .then(res=>{
    //     //         console.log("login page got "+res)
    //     //     })
    // }

    // formSubmit=()=>{
    //     //prevent default

    //     //get .value of all input fields
    //     //format it however data requires
    //     //user={ name: "steve", }

    //     //API.submitLogin(user)

    // }
    
    render(){
        return(
        <div>
            <nav>
                <ul>
                    <li><a href="/">Homepage</a></li>
                    <li><a href="/user/new">Create Account</a></li>
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
            <a class="create-new-btn" href="/user/new">Create Account</a>

            <NewLoginButton />
        </div>
        )
    }
}

export default Login;