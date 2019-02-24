import React, { Component } from "react";
import "./style.css";
import PageContainer from "../../components/pageContainer";
import {Col,Card,CardTitle} from "react-materialize";
import API from "../../utils/API";


class Course extends Component {
  
    constructor(props){
        super(props);
        // API.getOneCourse(courseId)
        // .then(response=> this.setState({course:response}))
        this.state={
            course:props.match.params.id
        }
    }


    render(){

        return(
            <PageContainer>

                <h1>Courses</h1>

                <Col m={7} s={12}>
                    <Card horizontal >
                    <p>This is a card!</p>
                    </Card>
                </Col>
            </PageContainer>    
        )

    }

}

export default Course