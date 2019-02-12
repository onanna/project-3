import React from "react";
import "./style.css";

function sidenav(){
    return(
        <ul id="slide-out" className="sidenav sidenav-fixed">
            <li><a href="/api/students">Test Students api</a></li>
            <li><a href="#!">Second Sidebar Link</a></li>
        </ul>
    )
}

export default sidenav;