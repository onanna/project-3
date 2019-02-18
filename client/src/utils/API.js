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
  deleteCourse:function(courseId){
    return axios.delete(`api/courses/${courseId}`)
  },
  //need
  updateCourse:function(courseId,data){
    return axios.put(`api/courses/${courseId}`,data)
  },
  //need to deprecate and make addNew
  addToCourseRoster:function(collection,dataToAdd, courseId){
    let dataToSendToBackend={collection:collection,dataToAdd:dataToAdd}    
    return axios.post(`/api/courses/${courseId}`,dataToSendToBackend)
  }, 
    // --------------Student Roster Functions--------------
      //need
      removeStudentsFromCourse:function(courseId,studentsToRemove){
        return axios.put(`/api/courses/${courseId}/students`,studentsToRemove)
      },
      //need
      addStudentsToCourse:function(courseId,studentsToAdd){
        return axios.post(`/api/courses/${courseId}/students`,studentsToAdd)
      },
    // --------------Instructor Roster Functions--------------
      //need
      removeInstructorsFromCourse:function(courseId,instructorsToRemove){
        return axios.put(`/api/courses/${courseId}/instructors`,instructorsToRemove)
      },
      //need
      addInstructorsToCourse:function(courseId,instructorsToAdd){
        return axios.post(`/api/courses/${courseId}/instructors`,instructorsToAdd)
      },
    // ----------------------------------------------------
};
