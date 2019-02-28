import React, { Component } from "react";
import "./style.css";
import PageContainer from "../../components/pageContainer";
import API from "../../utils/API";
import H1 from "../../components/h1withDivider";


class Course extends Component {
  
    constructor(props){
        super(props);
        // API.getOneCourse(courseId)
        // .then(response=> this.setState({course:response}))
        // this.state={
        //     course:props.match.params.id
        // }
        console.log(JSON.stringify("the props are" +JSON.stringify(this.props)))
        this.state = {
            course:props.fullCourse
        }

    }

    componentDidMount=()=>{
        console.log("full course: " + this.state.course)
    }


    render(){

        return(
            <PageContainer>
                <H1>Hello!</H1>
    
            </PageContainer>    
        )

    }

}

export default Course