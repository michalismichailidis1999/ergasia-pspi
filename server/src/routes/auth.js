const express = require("express");
const {check} = require("express-validator")
const {register, login, adminLogin} = require("../controllers/auth")

const router = express.Router();

router.post("/register", [
    check("firstName", "First name is required").notEmpty(),
    check("firstName", "First name must be between 2-50 characters").isLength({min: 2, max: 50}),
    check("lastName", "Last name is required").notEmpty(),
    check("lastName", "Last name must be between 2-50 characters").isLength({min: 2, max: 50}),
    check("email", "Email is required").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
    check("password", "Password must be at least 6 characters").isLength({min: 6})
], register)

router.post("/login", [
    check("email", "Email is required").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
], login)

router.post("/login/admin", [
    check("email", "Email is required").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
], adminLogin)

module.exports = router;