import React, { Component } from "react";
import "./style.css";
import PageContainer from "../../components/pageContainer";
import API from "../../utils/API";
import H1 from "../../components/h1withDivider";


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
                <div className="row"> 
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-image">

                                <img src="" />

                                <span className="card-title">Card Title</span>
                                
                                <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">Add</i></a>

                                <div className="card-content">
                                    <p>{this.state.course.name}</p>
                                    <p>{this.state.course.numberOfSeats}</p>
                                    <p>{this.state.course.startDate}</p>
                                    <p>{this.state.course.endDate}</p>
                                    <p>{this.state.course.startTime}</p>
                                    <p>{this.state.course.endTime}</p>
                                    <p>{this.state.course.location}</p>
                                    <p>{this.state.course.instructors}</p>
                                    <p>{this.state.course.students}</p>            
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>    
        )

    }

}

export default Course