import React from "react";
import "./style.css";

function sidenav(){
    return(
        <ul id="slide-out" className="sidenav sidenav-fixed">
            <li><a href="#!">First Sidebar Link</a></li>
            <li><a href="#!">Second Sidebar Link</a></li>
        </ul>
    )
}

export default sidenav;