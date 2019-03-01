import React, { Component } from "react";
import "./style.css";
import PageContainer from "../../components/pageContainer";
import API from "../../utils/API";
import H1 from "../../components/h1withDivider";
import {Col, Card} from 'react-materialize';


class Course extends Component {
    state={
        course:{}
    }
  
    constructor(props){
        super(props);
        console.log(JSON.stringify(this.props.match.params.id))
        
        API.getOneCourse(this.props.match.params.id)
        .then(response=> this.setState({course:response.data}))
        .catch(err => console.log("ERROR ERROR ERROR "+err))

    }

    componentDidMount=()=>{
        console.log("full course: " + this.state.course)
    }


    render(){

        return(
            <PageContainer>

                <h1>Courses</h1>

                <Col m={7} s={12}>
                    <Card horizontal >
                    <p>This is a card!</p>
                    <p>{this.state.course.name}</p>
                    </Card>
                </Col>
            </PageContainer>    
        )

    }

}

export default Course