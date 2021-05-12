const express = require("express");
const {requireLogin, isAuthorized, userById, isAdmin} = require("../middlewares/user")
const {getCategories, createCategory, editCategory, deleteCategory} = require("../controllers/category")
const {categoryById} = require("../middlewares/category")
const {check} = require("express-validator")

const router = express.Router()

router.get("/categories/:userId", requireLogin, isAuthorized, getCategories);

router.post("/categories/create/:userId", requireLogin, isAuthorized, isAdmin, [
    check("title", "Category title is required").notEmpty()
], createCategory);

router.put("/categories/:categoryId/:userId", requireLogin, isAuthorized, isAdmin, [
    check("title", "Category title is required").notEmpty()
], editCategory);

router.delete("/categories/:categoryId/:userId", requireLogin, isAuthorized, isAdmin, deleteCategory);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;