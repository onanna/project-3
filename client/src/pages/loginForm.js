import React, { Component } from "react";
// import Pagecontainer from "../components/pageContainer/index"
import NewLoginForm from "../components/newLoginForm/newLoginForm"

class NewLoginForm extends Component{
    render(){
        return(
            // <Pagecontainer>
            <div id="modal1" class="modal">
                <div class="modal-content">
                    <NewLoginForm></NewLoginForm>
                </div>
            </div>
            // </Pagecontainer>
        )
    }
}

export default NewLoginForm;