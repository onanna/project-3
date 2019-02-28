import React from "react";
import "./style.css";

function sendAttendance(props){

    return(
        <button onClick={props.submitFunction} className="btn-large waves-light" type="submit">
            Submit
        </button>
    )
}

export default sendAttendance;