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
    getTeacherCourses,
    getCompletedCourses,
    changeLessonStatus,
    completeCourse,
    removeCompletedCourse,
    createSection,
    createLesson,
    removeSection,
    removeLesson,
    removeCourse,
    getMyRatings,
    rateCourse,
    updateCourseRating,
    getMonthlyEnrollments,
    getCategoryEnrollments
} = require("../controllers/course")
const { userById, requireLogin, isAuthorized, isTeacher, isAdmin } = require("../middlewares/user")
const { courseById, lessonById, sectionById } = require("../middlewares/course")

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

router.get("/courses/completed/:userId", requireLogin, isAuthorized, getCompletedCourses)

router.put("/courses/update_lesson/:lessonId/:userId", requireLogin, isAuthorized, [
    check("status", "Status is required").notEmpty(),
    check("status", "Status must be 0 or 1").isInt({min:0, max: 1})
], changeLessonStatus)

router.post("/courses/:courseId/complete/:userId", requireLogin, isAuthorized, completeCourse);

router.delete("/courses/completed/:courseId/remove/:userId", requireLogin, isAuthorized, removeCompletedCourse);

router.post("/courses/:courseId/create_section/:userId", requireLogin, isAuthorized, isTeacher, [
    check("title", "Title is required").notEmpty()
], createSection)

router.post("/courses/sections/:sectionId/create_lesson/:userId", requireLogin, isAuthorized, isTeacher,  createLesson)

router.delete("/courses/sections/:sectionId/:userId", requireLogin, isAuthorized, isTeacher, removeSection)

router.delete("/courses/lessons/:lessonId/:userId", requireLogin, isAuthorized, isTeacher, removeLesson)

router.delete("/courses/:courseId/:userId", requireLogin, isAuthorized, isTeacher, removeCourse);

router.get("/courses/ratings/:userId", requireLogin, isAuthorized, getMyRatings)

router.post("/courses/:courseId/rate/:userId", requireLogin, isAuthorized, [
    check("rating", "Rating is required").notEmpty(),
    check("rating", "Rating must be between 1-5").isInt({min: 1, max: 5})
], rateCourse);

router.put("/courses/:courseId/rate/:userId", requireLogin, isAuthorized, [
    check("rating", "Rating is required").notEmpty(),
    check("rating", "Rating must be between 1-5").isInt({min: 1, max: 5})
], updateCourseRating);

router.get("/courses/monthly_enrollments/:userId", requireLogin, isAuthorized, isAdmin, getMonthlyEnrollments);
router.get("/courses/category_enrollments/:userId", requireLogin, isAuthorized, isAdmin, getCategoryEnrollments);

router.param("userId", userById)
router.param("courseId", courseById)
router.param("lessonId", lessonById)
router.param("sectionId", sectionById)

module.exports = router