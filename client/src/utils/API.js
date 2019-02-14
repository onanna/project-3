import axios from "axios";

export default {
  //need
  addStudent:function(query,req){
    return axios.post(`api/students/${query}`,req.body);
  },
  //need
  getStudent:function(query){
    return axios.get(`api/students/${query}`)
  },
  getAllStudents: function() {
    return axios.get("/api/students");
  },
  //need
  updateStudent:function(idToChange,whatToChange,newValue){
    let relevantData={newValue:newValue,whatToChange:whatToChange}
    return axios.put(`api/students/${idToChange}`,[relevantData])
  },
  deleteStudent:function(id){
    return axios.delete(`api/students/${id}`)
  },





  getInstructor:function(query){
    return axios.get(`api/instructors/${query}`)
  },
  getAllInstructors:function(){
    return axios.get("/api/instructors")
  },
  deleteInstructor:function(id){
    return axios.delete(`api/instructors/${id}`)
  },



  
  
  getCourse:function(query){
    return axios.get(`api/courses/${query}`)
  },
  getAllCourses:function(){
    return axios.get("/api/courses")
  },
  deleteCourse:function(query){
    return axios.delete(`api/courses/${query}`)
  }
};
