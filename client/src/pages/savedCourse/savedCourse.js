import React, { Component } from "react";
import "./style.css";
import PageContainer from "../../components/pageContainer";
import {Col,Card,CardTitle} from "react-materialize";


class Course extends Component {
  

    render(){
        return(
            <PageContainer>

                <h1>Courses2</h1>

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