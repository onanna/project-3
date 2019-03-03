import React from "react";
import {Col,Row} from "react-materialize";


const InputFile =()=>{
    return(
        <Row className="page-container container">
        <Col s={12}>
        <form>
        
    <div className="file-field input-field">
      <div className="btn">
        <span>File</span>
        <input type="file" />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
  </form>
  </Col>
  </Row>
    )
}
export default InputFile

