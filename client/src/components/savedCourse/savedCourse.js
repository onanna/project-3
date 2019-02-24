import React, { Component } from "react";
import "./savedCourse.css";
import PageContainer from "../pageContainer";

class Course extends Component {
    render(){
        return(
            <PageContainer>

                <h1>Courses</h1>

                <div class="row">
                    <div class="col s7 m5">
                    <div class="card-panel white">
                    <span class="black-text">I am a very simple card.
                    </span>
                    </div>
                    </div>
                </div>
            </PageContainer>    
        )
    }
}

export default Course