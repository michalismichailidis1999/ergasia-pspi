const db = require("../config/db");
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator");

const updateFirstName = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {firstName} = req.body;

        let query = `UPDATE users SET first_name='${firstName}' WHERE id=${req.user.id}`;

        db.query(query, (err) => {
            if(err) throw err;

            res.json({message: "First name updated successfully!"});
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const updateLastName = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {lastName} = req.body;

        let query = `UPDATE users SET last_name='${lastName}' WHERE id=${req.user.id}`;

        db.query(query, (err) => {
            if(err) throw err;

            res.json({message: "Last name updated successfully!"});
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const updateEmail = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {email} = req.body;

        let query = `SELECT id FROM users WHERE email='${email}'`;

        db.query(query, (err, result) => {
            if(err) throw err;

            if(result.length > 0){
                return res.status(400).json({error: "Email is already taken!"})
            }

            query = `UPDATE users SET email='${email}' WHERE id=${req.user.id}`;

            db.query(query, (err) => {
                if(err) throw err;

                res.json({message: "Email updated successfully!"});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const updatePassword = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        let query = `UPDATE users SET password='${encryptedPassword}' WHERE id=${req.user.id}`;

        db.query(query, (err) => {
            if(err) throw err;

            res.json({message: "Password updated successfully!"});
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const updatePhoto = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {photoURL} = req.body;

        let query = `UPDATE users SET photoURL='${photoURL}' WHERE id=${req.user.id}`;

        db.query(query, (err) => {
            if(err) throw err;

            res.json({message: "Photo updated successfully!"});
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

module.exports = {updateFirstName, updateLastName, updateEmail, updatePassword, updatePhoto}