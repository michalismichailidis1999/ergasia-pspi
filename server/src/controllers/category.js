const db = require("../config/db")

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

module.exports = {getCategories}