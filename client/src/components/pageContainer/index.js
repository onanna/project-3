import React from "react";
import Sidenav from "../sidenav/sidenav"
import {Col,Row} from "react-materialize";
import "./style.css";

export default function pageContainer({children}){
    return(

        <div>

            {/* <Sidenav />      */}
            <Row className="page-container">
                <Col s={12}>

                    {children}
                
                </Col>
            </Row>
        </div>

    )
}
