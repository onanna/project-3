import React from "react";
import "./style.css";

function submitButton(props){

    return(
        <button onClick={props.submitFunction} className="btn-large waves-effect waves-light z-depth-5 submitbtnclass " type="submit">
            Submit
        </button>
    )
}

export default submitButton;