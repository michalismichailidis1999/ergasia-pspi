const db = require("../config/db");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const jwtSecret = process.env.JWT_SECRET;

const userById = (req, res, next, id) => {
    try {
        const userId = parseInt(id);

        let query = `SELECT id, first_name, last_name, email, photoURL, role FROM users WHERE id=${userId}`;

        db.query(query, (err, result) => {
            if(err) throw err;

            if(result.length === 0){
                return res.status(404).json({error: "User not found!"});
            }

            req.user = result[0];

            next();
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message});
    }
}

const requireLogin = (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({error: "User not authorized"});
        }

        jwt.verify(token, jwtSecret, (err, payload) => {
            if(err) throw err;

            req.auth = payload;

            next();
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message});
    }
}

const isAuthorized = (req, res, next) => {
    try {
        if(req.auth.id !== req.user.id){
            return res.status(401).json({error: "User not authorized. False credentials"});
        }

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message});
    }
}

const isAdmin = (req, res, next) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(401).json({error: "User not authorized."});
        }

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message});
    }
}

const isTeacher = (req, res, next) => {
    try {
        if(req.user.role !== 'teacher'){
            return res.status(401).json({error: "User not authorized."});
        }

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message});
    }
}

module.exports = {userById, requireLogin, isAuthorized, isAdmin, isTeacher}