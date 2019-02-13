import React from "react";
import {Col,Row} from "react-materialize";
import "./style.css";

export default function pageContainer({children}){
    return(
        <Row className="page-container container">
            <Col s={12}>

                {children}
            
            </Col>
        </Row>
    )
}
