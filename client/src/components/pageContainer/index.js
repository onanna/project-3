import React, {Component} from "react";
import Sidenav from "../sidenav/sidenav"
import {Col,Row} from "react-materialize";
import "./style.css";
import SideTrigger from '../sidenavTrigger/sidenavTrigger'
const $=window.$;

export default function pageContainer({children}){
    return(
        
        <div className='page-container'>
            <SideTrigger />
            <div clasName='row'>
                <div className='col s12'>
                    
                        {children}
                </div>
            </div>
        </div>

    )
}
