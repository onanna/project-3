import React from "react";
import "./style.css";

function sidenav(props){

    return(
        <div>
            <ul id="slide-out-sidenav" className="sidenav sidenav-fixed">
                <li><div className="user-view">
                    {/* <div class="background">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNADC7o5R7BPr3GB4-xQSeTxm1VE2IW7c2nCtz0JPlj6Tg4edS" />>
                    </div> */}
                    <a><img alt='profile' className="circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWDhoK42boDGGv75AmVqLRwBkHoplmu9dL2a-c3ui0JRurCo3Q"/></a>
                    <a href={'/profile'}><span className="name">{props.userName}</span></a>
                    <div className='divider'></div>
                    </div></li>
                <li className="firstItem sidenav-close"><a className='sideLink'href="/">Courses</a></li>
                <li className="sidenav-close"><a className='sideLink' href="/students/all">Students</a></li>
                <li className="sidenav-close"><a className='sideLink'href="/instructors/all">Instructors</a></li>
                {/* <li className="sidenav-close"><a className='sideLink'href="/newcourse">Add Course</a></li> */}
                
                <li className="sidenav-close"><a id='logSide'className='logoutSidenav'onClick={props.deleteToken}>Logout</a></li>
            </ul>
        </div>
    )
}

export default sidenav;