const db = require("../config/db");
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator");
const path = require("path");

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

        const {password, newPassword} = req.body;

        let query = `SELECT password FROM users WHERE email='${req.user.email}'`;

        db.query(query, async (err, result) => {
            if(err) throw err;

            let oldPassword = result[0].password;

            let isMatch = await bcrypt.compare(password, oldPassword);

            if(!isMatch){
                return res.status(400).json({error: "You didn't type correctly you password!"});
            }

            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(newPassword, salt);
    
            query = `UPDATE users SET password='${encryptedPassword}' WHERE id=${req.user.id}`;
    
            db.query(query, (err) => {
                if(err) throw err;
    
                res.json({message: "Password updated successfully!"});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const updatePhoto = (req, res) => {
    try {
        const file = req.files.file;

        if(!file){
            return res.status(400).json({error: "Photo is required"})
        }

        file.mv(path.join(__dirname, "..", "..", "..", "public", "assets", "userImages", file.name), (err) => {
            if(err) throw err;

            let query = `UPDATE users SET photoURL='/assets/userImages/${file.name}'`;

            db.query(query, (err) => {
                if(err) throw err;

                res.json({message: "Profile photo updated successfully"});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const getUsers = (req, res) => {
    try {
        let query = `SELECT id, first_name, last_name, email, role FROM users WHERE role!='admin'`;

        db.query(query, (err, result) => {
            if(err) throw err;

            res.json(result);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const updateUserRole = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {role} = req.body;

        let userToUpdateId = parseInt(req.params.userToUpdateId);

        let query = `SELECT id from users WHERE id=${userToUpdateId}`;

        db.query(query, (err, result) => {
            if(err) throw err;

            if(result.length === 0){
                return res.status(404).json({error: "User not found"});
            }

            query = `UPDATE users SET role='${role}' WHERE id=${userToUpdateId}`;

            db.query(query, (err) => {
                if(err) throw err;
                
                res.json({message: "User role updated successfully"});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

module.exports = {updateFirstName, updateLastName, updateEmail, updatePassword, updatePhoto, getUsers, updateUserRole}