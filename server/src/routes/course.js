const express = require("express");
const { check } = require("express-validator");
const { 
    getCourses, 
    getEnrolledCourses, 
    enrollToCourse, 
    unenrollFromCourse, 
    fetchCourseInfo, 
    createCourse, 
    updateCourse, 
    getTeacherCourses
} = require("../controllers/course")
const { userById, requireLogin, isAuthorized, isTeacher } = require("../middlewares/user")
const { courseById } = require("../middlewares/course")

const router = express.Router()

router.post("/courses/:userId", requireLogin, isAuthorized, [
    check("filterBy", "Filter By is required").notEmpty(),
    check("filterBy", "Filter by must be (None | Most Enrolled | Highest Rating | Recommendations)")
    .matches(/^(None|Most Enrolled|Highest Rating|Recommendations)$/),
    check("category", "Category is required").notEmpty()
], getCourses)

router.get("/courses/enrolled/:userId", requireLogin, isAuthorized, getEnrolledCourses);

router.post("/courses/:courseId/enroll/:userId", requireLogin, isAuthorized, enrollToCourse);

router.delete("/courses/:courseId/unenroll/:userId", requireLogin, isAuthorized, unenrollFromCourse);

router.get("/courses/:courseId/info/:userId", requireLogin, isAuthorized, fetchCourseInfo)

router.post("/courses/create_course/:userId", requireLogin, isAuthorized, isTeacher, createCourse);

router.put("/courses/:courseId/update_course/:userId", requireLogin, isAuthorized, isTeacher, updateCourse);

router.get("/courses/teacher/:userId", requireLogin, isAuthorized, isTeacher, getTeacherCourses);

router.param("userId", userById)
router.param("courseId", courseById)

module.exports = router