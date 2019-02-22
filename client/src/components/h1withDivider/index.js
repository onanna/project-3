import React from "react";
import "./style.css";

function headerWithDivider({children}){

    return(
        <div>
            <h1 id="pageHeader" className="center-align">{children}</h1>
            <div className="divider"></div>
        </div>
    )
}

export default headerWithDivider;