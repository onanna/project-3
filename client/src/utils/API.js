import axios from "axios";

export default {
  addStudent:function(query,req){
    return axios.post(`api/students/${query}`,req.body);
  },
  getStudent:function(query){
    return axios.get(`api/students/: ${query}`)
  },
  getAllStudents: function() {
    return axios.get("/api/students");
  },
  updateStudent:function(query,whatToChange,newValue){
    return axios.put(`api/students/:${query}`,newValue,whatToChange)
  },
  deleteStudent:function(query){
    return axios.delete(`api/students/: ${query}`)
  },


  getInstructor:function(query){
    return axios.get(`api/instructors/: ${query}`)
  },
  getAllInstructors:function(){
    return axios.get("/api/instructors")
  },
  deleteInstructor:function(query){
    return axios.delete(`api/instructors/: ${query}`)
  },
  
  
  getCourse:function(query){
    return axios.get(`api/courses/: ${query}`)
  },
  getAllCourses:function(){
    return axios.get("/api/courses")
  },
  deleteCourse:function(query){
    return axios.delete(`api/courses/: ${query}`)
  }
};
