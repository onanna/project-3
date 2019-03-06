import React,{Component} from "react";
import "./style.css";
const $=window.$;

class sidenavTrigger extends Component{

    componentDidMount=()=>{
        $('.sidenav').sidenav();
    }

    render(){
        return(
            <a id='sidenavTrigger'data-target="slide-out-sidenav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        )
    }
}

export default sidenavTrigger;