import React from "react";
import "./style.css";

function sidenav(){

    return(
        <div>
            <ul id="slide-out" className="sidenav sidenav-fixed">
                <li className=" sidenav-close"><a href="/">Go Back Home</a></li>
                <li className="sidenav-close"><a href="/students">View All Students</a></li>
                <li className="sidenav-close"><a href="/instructors">View All Instructors</a></li>
                <li className="sidenav-close"><a href="/attendance">attendance form test</a></li>
                <li className="sidenav-close"><a href="/newcourse">Add New Course</a></li>
            </ul>
            <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
    )
}

export default sidenav;