import axios from "axios";
// import signed from 'signed';

export default {
// ---------------------------STUDENT FUNCTIONS---------------------------
  addStudent:function(stuObject){
    return axios.post(`/api/students/`,stuObject);
  },
  getAllStudents: function() {
    return axios.get("/api/students");
  },
  updateStudent:function(idToChange,whatToChange,newValue){
    let dataToSendToBackend={newValue:newValue,whatToChange:whatToChange}
    return axios.put(`/api/students/${idToChange}`,[dataToSendToBackend])
  },
  deleteStudent:function(id){
    return axios.delete(`/api/students/${id}`)
  },

// ---------------------------INSTRUCTOR FUNCTIONS---------------------------
  addInstructor:function(insObject){
    return axios.post(`/api/instructors/`,insObject);
  },
  getInstructors:function(){
    return axios.get("/api/instructors")
  },
  updateInstructor:function(idToChange,whatToChange,newValue){
    let dataToSendToBackend={newValue:newValue,whatToChange:whatToChange}
    return axios.put(`/api/instructors/${idToChange}`,[dataToSendToBackend])
  },
  deleteInstructor:function(id){
    return axios.delete(`/api/instructors/${id}`)
  },
   
// ---------------------------COURSE FUNCTIONS---------------------------

  getAllCourses:function(){
    return axios.get("/api/courses")
  },
  getOneCourse:function(id){
    return axios.get(`/api/courses/${id}`)
  },
  addCourse:function(courseInfo){
    return axios.post(`/api/courses`,courseInfo);
  },
  deleteCourse:function(courseId){
    console.log("deleting "+courseId)
    return axios.delete(`/api/courses/${courseId}`)
  },
  updateCourse:function(courseId,whatToChange,newValue){
    let data={whatToChange:whatToChange,newValue:newValue}
    return axios.put(`/api/courses/${courseId}`,data)
  },
    // --------------Student Roster Functions--------------
      removeStudentsFromCourse:function(courseId,studentsToRemove){
        return axios.put(`/api/courses/${courseId}/students`,studentsToRemove)
      },
      addStudentsToCourse:function(courseId,studentsToAdd){
        return axios.post(`/api/courses/${courseId}/students`,studentsToAdd)
      },
    // --------------Instructor Roster Functions--------------
      removeInstructorsFromCourse:function(courseId,instructorsToRemove){
        return axios.put(`/api/courses/${courseId}/instructors`,instructorsToRemove)
      },
      addInstructorsToCourse:function(courseId,instructorsToAdd){
        return axios.post(`/api/courses/${courseId}/instructors`,instructorsToAdd)
      },
  // --------------Attendance Routes--------------
  sendAttendance:function(data){
    return axios.post(`/course-attendance/${data.course}`,data)
  },
  signedTest:function(data){
    // const signature = signed({
    //   secret: 'secret string'
    // });


    // const signedUrl = signature.sign(`course-attendance/${data.course}`);
    // console.log(signedUrl);
    // return axios.post(signedUrl,data)
  },

    // ----------------------------------------------------
    getLogin:function(){
      return axios.get(`/auth/login`);
    },
    submitUserLogin:function(userLoginInfo){
      return axios.post(`/auth/login/`,userLoginInfo)
    },
    checkToken:function(token){
      console.log("about to make call "+token)
      return axios.get(`/auth/token/${token}`)
    },
    deleteToken:function(token){
      return axios.delete(`/auth/token/${token}`)
    }
};
