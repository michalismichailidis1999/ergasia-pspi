const db = require("../config/db");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator")
const dotenv = require("dotenv")

dotenv.config()

const jwtSecret = process.env.JWT_SECRET

const register = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body

        let query = `SELECT id FROM users WHERE email='${email}'`;

        db.query(query, async (err, result) => {
            if(err) throw err;

            if(result.length > 0){
                return res.status(400).json({error: "Email is already taken!"})
            }

            const salt = await bcrypt.genSalt(10)

            const encryptedPassword = await bcrypt.hash(password, salt)
            
            query = `
                INSERT INTO users(first_name, last_name, email, password) 
                VALUES('${firstName}', '${lastName}', '${email}', '${encryptedPassword}')
            `

            db.query(query, (err) => {
                if(err) throw err;

                query = `SELECT id, first_name, last_name, email, photoURL, role FROM users WHERE email='${email}'`;

                db.query(query, (err, result) => {
                    if(err) throw err;

                    let user = result[0];

                    const payload = {
                        id: user.id,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email
                    }

                    jwt.sign(payload, jwtSecret, (err, token) => {
                        if(err) throw err;

                        res.json({user: {...payload, photoURL: user.photoURL, role: user.role}, token})
                    })
                })
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const login = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {
            email,
            password
        } = req.body

        let query = `SELECT id, first_name, last_name, email, password, photoURL, role FROM users WHERE email='${email}'`;

        db.query(query, async (err, result) => {
            if(err) throw err;

            if(result.length === 0){
                return res.status(404).json({error: "User not found"});
            }

            let user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({error: "Email or password is wrong!"});
            }

            const payload = {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            }

            jwt.sign(payload, jwtSecret, (err, token) => {
                if(err) throw err;

                res.json({user: {...payload, photoURL: user.photoURL, role: user.role}, token})
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const adminLogin = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {
            email,
            password
        } = req.body

        let query = `SELECT id, first_name, last_name, email, password, photoURL, role FROM users WHERE email='${email}'`;

        db.query(query, async (err, result) => {
            if(err) throw err;

            if(result.length === 0){
                return res.status(404).json({error: "User not found"});
            }

            let user = result[0];

            if(user.role !== "admin"){
                return res.status(401).json({error: "User not authorized!"})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({error: "Email or password is wrong!"});
            }

            const payload = {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            }

            jwt.sign(payload, jwtSecret, (err, token) => {
                if(err) throw err;

                res.json({user: {...payload, photoURL: user.photoURL, role: user.role}, token})
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

module.exports = {register, login, adminLogin}