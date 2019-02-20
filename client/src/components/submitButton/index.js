import React from "react";
import "./style.css";

function submitButton(props){

    return(
        <button onClick={props.submitFunction} className="btn-large waves-light" type="submit">
            Submit
        </button>
    )
}

export default submitButton;