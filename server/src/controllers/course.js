const db = require("../config/db");
const {validationResult} = require("express-validator")
const {getAsyncData} = require("../helper")
const path = require("path");

const getCourses = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {filterBy, category} = req.body;

        let query = "";

        if(filterBy !== "Recommendations"){
            query = "SELECT * FROM courses";

            if(category === "all"){
                switch(filterBy){
                    case "Most Enrolled":
                        query += " ORDER BY enrolls DESC";
                        break;
                    case "Highest Rating":
                        query += " ORDER BY rating DESC";
                        break;
                    default:
                        break;
                }
            }else{
                console.log(category, typeof category)
                query += ` AS c INNER JOIN categories as cat ON c.category_id=cat.id WHERE cat.id=${parseInt(category)}`

                switch(filterBy){
                    case "Most Enrolled":
                        query += " ORDER BY enrolls DESC";
                        break;
                    case "Highest Rating":
                        query += " ORDER BY rating DESC";
                        break;
                    default:
                        break;
                }
            }
        }else{
            query = `
                SELECT * FROM courses WHERE id NOT IN 
                (SELECT c.id FROM courses AS c INNER JOIN enrollments AS e ON c.id=e.course_id WHERE e.student_id=${req.user.id})
            `

            if(category !== "all"){
                query += ` AND category_id=${parseInt(category)}`
            }
        }

        db.query(query, (err, result) => {
            if(err) throw err;

            res.json(result);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const getEnrolledCourses = (req, res) => {
    try {
        let query = `
            SELECT c.id, c.title, c.photoURL, c.description, c.enrolls, c.rating, c.category_id, c.teacher_id FROM courses AS c
            INNER JOIN enrollments AS e ON e.course_id=c.id WHERE e.student_id=${req.user.id}
        `;

        db.query(query, (err, result) => {
            if(err) throw err;

            res.json(result);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const enrollToCourse = (req, res) => {
    try {
        let query = `SELECT id FROM enrollments WHERE course_id=${req.course.id} AND student_id=${req.user.id}`;

        db.query(query, (err, result) => {
            if(err) throw err;

            if(result.length > 0){
                return res.status(400).json({error: "You have been already enrolled in this course"});
            }

            query = `INSERT INTO enrollments(course_id, student_id) VALUES(${req.course.id}, ${req.user.id})`;

            db.query(query, (err) => {
                if(err) throw err;

                res.json({message: "You enrolled successfully in this course"});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const unenrollFromCourse = (req, res) => {
    try {
        let query = `SELECT id FROM enrollments WHERE course_id=${req.course.id} AND student_id=${req.user.id}`;

        db.query(query, (err, result) => {
            if(err) throw err;

            if(result.length === 0){
                return res.status(400).json({error: "You haven't been enrolled in this course yet"});
            }

            query = `DELETE FROM enrollments WHERE course_id=${req.course.id} AND student_id=${req.user.id}`;

            db.query(query, (err) => {
                if(err) throw err;

                res.json({message: "You have successfully unenrolled from this course"});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const fetchCourseInfo = (req, res) => {
    try {
        let query = `SELECT CONCAT(first_name, ' ', last_name) AS teacher_name FROM users WHERE id=${req.course.teacher_id}`;

        db.query(query, (err, result) => {
            if(err) throw err;

            let teacherName = result[0].teacher_name;

            query = `SELECT id, title FROM sections WHERE course_id=${req.course.id}`;

            db.query(query, async (err, result) => {
                if(err) throw err;

                let sections = result;

                for(let i = 0; i < sections.length; i++){
                    query = `SELECT id, title, pdfURL, completed FROM lessons WHERE section_id=${sections[i].id}`;

                    const lessons = await getAsyncData(query);

                    sections[i].lessons = lessons;
                }

                res.json({teacherName, sections});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const createCourse = (req, res) => {
    try {
        const file = req.files.file;
        const title = req.body.title;
        const description = req.body.description;
        const category_id = parseInt(req.body.category_id);

        if(!file || !title || !description || !category_id){
            return res.status(400).json({error: "Please fill in all fields!"})
        }

        file.mv(path.join(__dirname, "..", "..", "..", "public", "assets", "images", file.name), (err) => {
            if(err) throw err;

            let query = `
                INSERT INTO courses(title, photoURL, description, category_id, teacher_id)
                VALUES('${title}', '/assets/images/${file.name}', '${description}', ${category_id}, ${req.user.id})
            `

            db.query(query, (err) => {
                if(err) throw err;

                res.json({message: "Course created successfully!"});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const updateCourse = (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const category_id = parseInt(req.body.category_id);

        if(!title || !description || !category_id){
            return res.status(400).json({error: "Please fill in all fields!"})
        }

        if(req.files){
            const file = req.files.file;
            let query = `
                UPDATE courses SET title='${title}', photoURL='/assets/images/${file.name}', 
                description='${description}', category_id=${category_id} WHERE id=${req.course.id}
            `

            file.mv(path.join(__dirname, "..", "..", "..", "public", "assets", "images", file.name), (err) => {
                if(err) throw err;
    
                db.query(query, (err) => {
                    if(err) throw err;
    
                    res.json({message: "Course updated successfully!"});
                })
            })
        }else{
            let query = `
                UPDATE courses SET title='${title}', description='${description}', 
                category_id=${category_id} WHERE id=${req.course.id}
            `

            db.query(query, (err) => {
                if(err) throw err;

                res.json({message: "Course updated successfully!"});
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const getTeacherCourses = (req, res) => {
    try {
        let query = `SELECT * FROM courses WHERE teacher_id=${req.user.id}`;

        db.query(query, (err, result) => {
            if(err) throw err;

            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status({error: err.message});
    }
}

module.exports = {
    getCourses, 
    getEnrolledCourses, 
    enrollToCourse, 
    unenrollFromCourse, 
    fetchCourseInfo, 
    createCourse, 
    updateCourse, 
    getTeacherCourses
}