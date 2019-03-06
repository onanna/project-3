import React from "react";
import "./style.css";

function headerWithDivider(props){

    return(
        <div>
            <h1 className={`${props.align}-align pageHeader`}>{props.text}</h1>
            <div className="divider headerDiv"></div>
        </div>
    )
}

export default headerWithDivider;