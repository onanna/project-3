import axios from "axios";
// import signed from 'signed';

export default {
// ---------------------------STUDENT FUNCTIONS---------------------------
  addStudent:function(stuObject){
    return axios.post(`/api/students/`,stuObject);
  },
  getAllStudents: function(user) {
    return axios.get(`/api/students/user/${user}`);
  },
  getOneStudent:function(studentId){
    return axios.get(`/api/students/${studentId}`)
  },
  updateStudent:function(idToChange,whatToChange,newValue){
    let dataToSendToBackend={newValue:newValue,whatToChange:whatToChange}
    return axios.put(`/api/students/${idToChange}`,[dataToSendToBackend])
  },
  deleteStudent:function(userId,idToDelete){
    return axios.delete(`/api/students/delete/${userId}/${idToDelete}`)
  },
  newStuAndAdd:function(courseId,studentData){
    return axios.post(`/api/students/new-add/${courseId}`,studentData)
  },

// ---------------------------INSTRUCTOR FUNCTIONS---------------------------
  addInstructor:function(insObject){
    return axios.post(`/api/instructors/`,insObject);
  },
  getInstructors:function(user){
    return axios.get(`/api/instructors/user/${user}`)
  },
  getOneinstructor:function(instructorId){
    return axios.get(`/api/instructors/${instructorId}`)
  },
  updateInstructor:function(idToChange,whatToChange,newValue){
    let dataToSendToBackend={newValue:newValue,whatToChange:whatToChange}
    return axios.put(`/api/instructors/${idToChange}`,[dataToSendToBackend])
  },
  deleteInstructor:function(userId,idToDelete){
    return axios.delete(`/api/instructors/delete/${userId}/${idToDelete}`)
  },
  newInstAndAdd:function(courseId,instructorData){
    return axios.post(`/api/instructors/new-add/${courseId}`,instructorData)
  },
   
// ---------------------------COURSE FUNCTIONS---------------------------

  getAllCourses:function(user){
    return axios.get(`/api/courses/user/${user}`)
  },
  getOneCourse:function(id){
    return axios.get(`/api/courses/${id}`)
  },
  addCourse:function(courseInfo){
    return axios.post(`/api/courses`,courseInfo);
  },
  deleteCourse:function(userId,courseId){
    return axios.delete(`/api/courses/delete/${userId}/${courseId}`)
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
  
  sendAttendanceForm:function(urlToSend){
    return axios.post(`/course-attendance/send/:courseId`,urlToSend)
  },
  sendAttendance:function(data){
    return axios.post(`/course-attendance/${data.course}`,data)
  }, 
  getAllAttendanceFromCourse(courseId){
    return axios.get(`/course-attendance/${courseId}`)
  },
    // ----------------USER FUNCTIONS------------------------------------    
    addUser:function(newUserInfo){
      return axios.post(`/user`,newUserInfo);
    },
    editUser:function(userId,whatToChange,newValue){
      let data={whatToChange:whatToChange,newValue:newValue}
      return axios.put(`/user/${userId}`,data)
    },
    getLogin:function(loginInfo){
      return axios.post(`/auth/login`,loginInfo);
    },
    // submitUserLogin:function(userLoginInfo){
    //   return axios.post(`/auth/login/`,userLoginInfo)
    // },
    checkToken:function(token){
      return axios.get(`/auth/token/${token}`)
    },
    deleteToken:function(token){
      return axios.delete(`/auth/token/${token}`)
    }
 
};
