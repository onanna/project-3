import React from "react";
import "./style.css";
import Logout from "../logoutButton"

function sidenav(props){

    return(
        <div>
            <ul id="slide-out" className="sidenav sidenav-fixed">
                <li className="firstItem sidenav-close"><a href="/">Go Back Home</a></li>
                <li className="sidenav-close"><a href="/students/all">View All Students</a></li>
                <li className="sidenav-close"><a href="/instructors/all">View All Instructors</a></li>
                <li className="sidenav-close"><a href="/newcourse">Add New Course</a></li>
                {/* <li className="sidenav-close"><a href="/savedCourse">View Courses</a></li> */}
                <li className="sidenav-close"> <Logout deleteToken={props.deleteToken}/></li>
            </ul>
            <a data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        </div>
    )
}

export default sidenav;