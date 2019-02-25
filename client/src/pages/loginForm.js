import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer/index"
import NewLoginForm from "../components/newLoginForm/newLoginForm"

class NewLoginForm extends Component{
    render(){
        return(
            <Pagecontainer>
                <NewLoginForm></NewLoginForm>
            </Pagecontainer>
        )
    }
}

export default NewLoginForm;