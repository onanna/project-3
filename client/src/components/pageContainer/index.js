import React from "react";
import "./style.css";
import SideTrigger from '../sidenavTrigger/sidenavTrigger'

export default function pageContainer({children}){
    return(
        
        <div className='page-container'>
            <SideTrigger />
            <div className='row'>
                <div className='col s12'>
                    
                        {children}
                </div>
            </div>
        </div>

    )
}
