import React from "react";
import "./style.css";

function submitButton(props){

    return(
        <button onClick={props.submitFunction} class="btn-large waves-effect waves-light" type="submit">
            Submit
        </button>
    )
}

export default submitButton;