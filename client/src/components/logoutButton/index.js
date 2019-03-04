import React, {Component} from "react";
import "./style.css";
import API from "../../utils/API"

// function logoutButton(props){
class logoutButton extends Component{

    logUserOut=()=>{
        this.props.deleteToken();
    }

    render(){
        return(
            <button onClick={this.logUserOut} className="btn-large waves-light" type="submit">
                Logout
            </button>
        )
    }
}

export default logoutButton;