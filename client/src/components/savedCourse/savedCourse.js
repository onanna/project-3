import React, { Component } from "react";
import "./savedCourse.css";
import PageContainer from "../pageContainer";
import {Col,Card,CardTitle} from "react-materialize";


class Course extends Component {
  

    render(){
        return(
            <PageContainer>

                <h1>Courses</h1>

                <Col m={7} s={12}>
                    <Card horizontal header={<CardTitle></CardTitle>}>
                       <p>This is a card!</p>
                    </Card>
                </Col>
            </PageContainer>    
        )

    }

}

export default Course