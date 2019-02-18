import axios from "axios";

export default {
// ---------------------------STUDENT FUNCTIONS---------------------------
  addStudent:function(stuObject){
    return axios.post(`api/students/`,stuObject);
  },
  getAllStudents: function() {
    return axios.get("/api/students");
  },
  updateStudent:function(idToChange,whatToChange,newValue){
    let dataToSendToBackend={newValue:newValue,whatToChange:whatToChange}
    return axios.put(`api/students/${idToChange}`,[dataToSendToBackend])
  },
  deleteStudent:function(id){
    return axios.delete(`api/students/${id}`)
  },

// ---------------------------INSTRUCTOR FUNCTIONS---------------------------
  addInstructor:function(insObject){
    return axios.post(`api/instructors/`,insObject);
  },
  getInstructors:function(){
    return axios.get("/api/instructors")
  },
  updateInstructor:function(idToChange,whatToChange,newValue){
    let dataToSendToBackend={newValue:newValue,whatToChange:whatToChange}
    return axios.put(`api/instructors/${idToChange}`,[dataToSendToBackend])
  },
  deleteInstructor:function(id){
    return axios.delete(`api/instructors/${id}`)
  },
   
// ---------------------------COURSE FUNCTIONS---------------------------

  getAllCourses:function(){
    return axios.get("/api/courses")
  },
  //need
  deleteCourse:function(query){
    return axios.delete(`api/courses/${query}`)
  },
  addToCourse:function(collection,dataToAdd, courseId){
    let dataToSendToBackend={collection:collection,dataToAdd:dataToAdd}    
    return axios.post(`/api/courses/${courseId}`,dataToSendToBackend)
  },
  //need

  //gonna be complicated bc can only have one .put request at this route. so all updates
  //need to be done through one function. 

  //OR I can just make
  //courses/:collection/:id
  //PUT - TO ADD REMOVE STUDENT
  //GET - TO GET INDIVIDUAL 






  // removeFromCourse:function(collection,whatToRemove,courseId){
  //   let dataToSendToBackend={collection:collection,whatToRemove:whatToRemove}    
  //   return axios.put(`/api/courses/${courseId}`,dataToSendToBackend)
  // }
};
