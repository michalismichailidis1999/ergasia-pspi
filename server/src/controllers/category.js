const db = require("../config/db")
const {validationResult} = require("express-validator")

const getCategories = (req, res) => {
    try {
        let query = "SELECT * FROM categories";

        db.query(query, (err, result) => {
            if(err) throw err;

            res.json(result);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const createCategory = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {title} = req.body;

        let query = `SELECT id FROM categories WHERE title='${title}'`;

        db.query(query, (err, result) => {
            if(err) throw err;

            if(result.length > 0){
                return res.status(400).json({error: "There is already a category with this title"})
            }

            query = `INSERT INTO categories(title) VALUES('${title}')`

            db.query(query, (err) => {
                if(err) throw err;

                query = `SELECT * FROM categories WHERE title='${title}'`;

                db.query(query, (err, result) => {
                    if(err) throw err;

                    res.json(result[0]);
                })
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const editCategory = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {title} = req.body;

        let query = `SELECT id FROM categories WHERE title='${title}'`;

        db.query(query, (err, result) => {
            if(err) throw err;

            if(result.length > 0){
                return res.status(400).json({error: "There is already a category with this title"})
            }

            query = `UPDATE categories SET title='${title}' WHERE id=${req.category.id}`

            db.query(query, (err) => {
                if(err) throw err;

                res.json({message: "Category updated successfully!"})
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const deleteCategory = (req, res) => {
    try {
        let query = `DELETE FROM categories WHERE id=${req.category.id}`;

        db.query(query, (err) => {
            if(err) throw err;

            res.json({message: "Category created successfully!"})
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message});
    }
}

module.exports = {getCategories, createCategory, editCategory, deleteCategory}