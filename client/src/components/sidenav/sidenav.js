import React from "react";
import "./style.css";
import Logout from "../logoutButton"

function sidenav(props){

    return(
        <div>
            <ul id="slide-out" className="sidenav sidenav-fixed">
                <li><div class="user-view">
                    {/* <div class="background">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNADC7o5R7BPr3GB4-xQSeTxm1VE2IW7c2nCtz0JPlj6Tg4edS" />>
                    </div> */}
                    <a><img class="circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWDhoK42boDGGv75AmVqLRwBkHoplmu9dL2a-c3ui0JRurCo3Q"/></a>
                    <a href={'/profile'}><span class="name">{props.userName}</span></a>
                    <div className='divider'></div>
                    {/* <a href={`user/profile`}><span class="white-text email">jdandturk@gmail.com</span></a> */}
                    </div></li>
                {/* <li><div className='divider'></div></li> */}
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