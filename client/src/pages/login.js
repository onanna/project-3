import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer/index"
import API from "../utils/API"

class Login extends Component{

    componentDidMount=()=>{
        API.getLogin()
            .then(res=>{
                console.log("login page got "+res)
            })
    }

    formSubmit=()=>{
        //prevent default

        //get .value of all input fields
        //format it however data requires
        //user={ name: "steve", }

        //API.submitLogin(user)

    }
    
    render(){
        return(
            <div>
                <nav>
                    <ul>
                        <li><a href="/auth/logout">Logout</a></li>
                        <li><a href="/auth/login">Login</a></li>
                        <li><a href="/">Homepage</a></li>
                    </ul>
                </nav>
                <header>
                    <h1>Login using...</h1>
                </header>
                <a class="google-btn" href="/auth/google">Google+</a>
            </div>
        )
    }
}

export default Login;