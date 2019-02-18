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
  addCourse:function(courseInfo){
    return axios.post('api/courses',courseInfo);
  },
  //need
  deleteCourse:function(id){
    return axios.delete(`api/courses/${id}`)
  },
  //need
  updateCourse:function(id,data){
    return axios.put(`api/courses/${id}`,data)
  },
  //need to deprecate
  addToCourseRoster:function(collection,dataToAdd, courseId){
    let dataToSendToBackend={collection:collection,dataToAdd:dataToAdd}    
    return axios.post(`/api/courses/${courseId}`,dataToSendToBackend)
  }, 
    // --------------Student Roster Functions--------------
      //need
      removeStudentsFromCourse:function(id,studentsToRemove){
        return axios.put(`/api/courses/${id}/students`,studentsToRemove)
      },
      //need
      addStudentsToCourse:function(id,studentsToAdd){
        return axios.post(`/api/courses/${id}/students`,studentsToAdd)
      },
    // --------------Instructor Roster Functions--------------
      //need
      removeInstructorsFromCourse:function(id,instructorsToRemove){
        return axios.put(`/api/courses/${id}/instructors`,instructorsToRemove)
      },
      //need
      addInstructorsToCourse:function(id,instructorsToAdd){
        return axios.post(`/api/courses/${id}/instructors`,instructorsToAdd)
      },
    // ----------------------------------------------------


//put
//get
//post
//delete

  // removeFromCourse:function(collection,whatToRemove,courseId){
  //   let dataToSendToBackend={collection:collection,whatToRemove:whatToRemove}    
  //   return axios.put(`/api/courses/${courseId}`,dataToSendToBackend)
  // }
};
