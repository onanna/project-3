import React from "react";
import "./style.css";

function submitButton(props){

    return(
        <button onClick={props.submitFunction} className="submitComp btn-large waves-effect waves-light submitbtnclass " type="submit">
            Submit
        </button>
    )
}

export default submitButton;