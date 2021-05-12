const express = require("express");
const {check} = require("express-validator");
const { updateFirstName, updateLastName, updateEmail, updatePassword, updatePhoto, getUsers, updateUserRole } = require("../controllers/user")
const {userById, requireLogin, isAuthorized, isAdmin} = require("../middlewares/user")

const router = express.Router()

router.put("/user/first_name/:userId", [
    check("firstName", "First name is required").notEmpty(),
    check("firstName", "First name must be between 2-50 characters").isLength({min: 2, max: 50})
], requireLogin, isAuthorized, updateFirstName);

router.put("/user/last_name/:userId", [
    check("lastName", "Last name is required").notEmpty(),
    check("lastName", "Last name must be between 2-50 characters").isLength({min: 2, max: 50})
], requireLogin, isAuthorized, updateLastName);

router.put("/user/email/:userId", [
    check("email", "Email is required").notEmpty(),
    check("email", "Please enter a valid email").isEmail()
], requireLogin, isAuthorized, updateEmail);

router.put("/user/password/:userId", [
    check("password", "Password is required").notEmpty(),
    check("newPassword", "New password is required").notEmpty(),
    check("newPassword", "New Password must be at least 6 characters").isLength({min: 6})
], requireLogin, isAuthorized, updatePassword);

router.put("/user/photo/:userId", requireLogin, isAuthorized, updatePhoto);

router.get("/users/:userId", requireLogin, isAuthorized, isAdmin, getUsers);

router.put("/user/:userToUpdateId/update_role/:userId", requireLogin, isAuthorized, isAdmin, updateUserRole);

router.param("userId", userById)

module.exports = router