const db = require("../config/db")

const courseById = (req, res, next, id) => {
    try {
        let query = `SELECT * FROM courses WHERE id=${id}`;

        db.query(query, (err, result) => {
            if(err) throw err;

            if(result.length === 0){
                return res.status(404).json({error: "Course not found!"});
            }

            req.course = result[0];

            next();
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

module.exports = {courseById}