const express = require("express");
const {requireLogin, isAuthorized, userById} = require("../middlewares/user")
const {getCategories} = require("../controllers/category")

const router = express.Router()

router.get("/categories/:userId", requireLogin, isAuthorized, getCategories);

router.param("userId", userById);

module.exports = router;