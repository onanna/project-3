import React from "react";
import "./style.css";
import { PromiseProvider } from "mongoose";

function headerWithDivider(props){

    return(
        <div>
            <h1 id="pageHeader" className={`${props.align}-align`}>{props.text}</h1>
            <div className="divider"></div>
        </div>
    )
}

export default headerWithDivider;