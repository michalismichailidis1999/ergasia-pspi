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
                    query = `SELECT id, title, pdfURL, completed, section_id FROM lessons WHERE section_id=${sections[i].id}`;

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

        let query = `SELECT id FROM courses WHERE title='${title}'`;

        db.query(query, (err, result) => {
            if(err) throw err;

            if(result.length > 0){
                return res.status(400).json({error: "A course with this title already exists!"})
            }

            file.mv(path.join(__dirname, "..", "..", "..", "public", "assets", "courseImages", file.name), (err) => {
                if(err) throw err;
    
                query = `
                    INSERT INTO courses(title, photoURL, description, category_id, teacher_id)
                    VALUES('${title}', '/assets/images/${file.name}', '${description}', ${category_id}, ${req.user.id})
                `
    
                db.query(query, (err) => {
                    if(err) throw err;
    
                    res.json({message: "Course created successfully"});
                })
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

            file.mv(path.join(__dirname, "..", "..", "..", "public", "assets", "courseImages", file.name), (err) => {
                if(err) throw err;
    
                db.query(query, (err) => {
                    if(err) throw err;
    
                    query = `SELECT * FROM courses WHERE id=${req.course.id}`;

                    db.query(query, (err, result) => {
                        if(err) throw err;

                        res.json(result[0])
                    })
                })
            })
        }else{
            let query = `
                UPDATE courses SET title='${title}', description='${description}', 
                category_id=${category_id} WHERE id=${req.course.id}
            `

            db.query(query, (err) => {
                if(err) throw err;

                res.json({message: "Course updated successfully"})
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

const changeLessonStatus = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {status} = req.body;

        let query = `UPDATE lessons SET completed=${status} WHERE id=${req.lesson.id}`

        db.query(query, (err) => {
            if(err) throw err;

            res.json({message: `Lesson completed status changed to ${status === 1 ? "true" : "false"}`})
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const completeCourse = (req, res) => {
    try {
        let query = `SELECT id from completed_courses WHERE student_id=${req.user.id} AND course_id=${req.course.id}`;

        db.query(query, (err, result) => {
            if(err) throw err;

            if(result.length > 0){
                return res.status(400).json({error: "This course is already completed!"})
            }

            query = `INSERT INTO completed_courses(student_id, course_id) VALUES(${req.user.id}, ${req.course.id})`;

            db.query(query, (err) => {
                if(err) throw err;

                res.json({message: "Course completed"});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const removeCompletedCourse = (req, res) => {
    try {
        let query = `SELECT id from completed_courses WHERE student_id=${req.user.id} AND course_id=${req.course.id}`;

        db.query(query, (err, result) => {
            if(err) throw err;

            if(result.length === 0){
                return res.status(400).json({error: "You haven't complete this course!"})
            }

            query = `DELETE FROM completed_courses WHERE student_id=${req.user.id} AND course_id=${req.course.id}`;

            db.query(query, (err) => {
                if(err) throw err;

                res.json({message: "Course removed from your completed courses"});
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const getCompletedCourses = (req, res) => {
    try {
        let query = `SELECT course_id FROM completed_courses`;

        db.query(query, (err, result) => {
            if(err) throw err;

            res.json(result)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message});
    }
}

const createSection = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {title} = req.body;

        let query = `INSERT INTO sections(title, course_id) VALUES('${title}', ${req.course.id})`

        db.query(query, (err) => {
            if(err) throw err;

            query = `SELECT id, title FROM sections WHERE course_id=${req.course.id} ORDER BY id DESC LIMIT 1`;

            db.query(query, (err, result) => {
                if(err) throw err;

                res.json(result[0])
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const createLesson = (req, res) => {
    try {
        const file = req.files.file;
        const title = req.body.title;

        if(!file || !title){
            return res.status(400).json({error: "Please fill in all fields!"})
        }

        file.mv(path.join(__dirname, "..", "..", "..", "public", "assets", "pdfs", file.name), (err) => {
            if(err) throw err;

            let pdfURL = `/assets/pdfs/${file.name}`;

            let query = `INSERT INTO lessons(title, pdfURL, section_id) VALUES('${title}', '${pdfURL}', ${req.section.id})`
    
            db.query(query, (err) => {
                if(err) throw err;
    
                query = `SELECT id, title, pdfURL, completed FROM lessons WHERE section_id=${req.section.id} ORDER BY id DESC LIMIT 1`;
    
                db.query(query, (err, result) => {
                    if(err) throw err;
    
                    res.json(result[0])
                })
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const removeSection = (req, res) => {
    try {
        let query = `DELETE FROM sections WHERE id=${req.section.id}`

        db.query(query, (err) => {
            if(err) throw err;
            
            res.json({message: "Section removed successfully!"})
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const removeLesson = (req, res) => {
    try {
        let query = `DELETE FROM lessons WHERE id=${req.lesson.id}`

        db.query(query, (err) => {
            if(err) throw err;
            
            res.json({message: "Lesson removed successfully!"})
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const removeCourse = (req, res) => {
    try {
        let query = `DELETE FROM courses WHERE id=${req.course.id}`;

        db.query(query, (err) => {
            if(err) throw err;

            res.json({message: "Course deleted successfully"});
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const getMyRatings = (req, res) => {
    try {
        let query = `SELECT rating, course_id FROM course_ratings WHERE student_id=${req.user.id}`;

        db.query(query, (err, result) => {
            if(err) throw err;

            res.json(result);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const rateCourse = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {rating} = req.body;

        let query = `INSERT INTO course_ratings(rating, student_id, course_id) VALUES(${rating}, ${req.user.id}, ${req.course.id})`;

        db.query(query, (err) => {
            if(err) throw err;

            query = `SELECT rating FROM course_ratings WHERE course_id=${req.course.id}`;

            db.query(query, (err, result) => {
                if(err) throw err;

                let totalRatings = result.length;
                let updatedRating = parseInt(result.reduce((acc, resultRow) => acc + resultRow.rating, 0) / totalRatings);

                query = `UPDATE courses SET rating=${updatedRating} WHERE id=${req.course.id}`;

                db.query(query, (err) => {
                    if(err) throw err;

                    query = `
                        SELECT cr.course_id, cr.rating, c.rating as course_rating FROM course_ratings AS cr 
                        INNER JOIN courses AS c ON cr.course_id=c.id
                        WHERE cr.student_id=${req.user.id} AND cr.course_id=${req.course.id}
                    `;

                    db.query(query, (err, result) => {
                        if(err) throw err;

                        res.json(result[0])
                    })
                })
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const updateCourseRating = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {rating} = req.body;

        let query = `UPDATE course_ratings SET rating=${rating} WHERE student_id=${req.user.id} AND course_id=${req.course.id}`;

        db.query(query, (err) => {
            if(err) throw err;

            query = `SELECT rating FROM course_ratings WHERE course_id=${req.course.id}`;

            db.query(query, (err, result) => {
                if(err) throw err;

                let totalRatings = result.length;
                let updatedRating = parseInt(result.reduce((acc, resultRow) => acc + resultRow.rating, 0) / totalRatings);

                query = `UPDATE courses SET rating=${updatedRating} WHERE id=${req.course.id}`;

                db.query(query, (err) => {
                    if(err) throw err;

                    query = `SELECT rating FROM courses WHERE id=${req.course.id}`;

                    db.query(query, (err, result) => {
                        if(err) throw err;

                        res.json(result[0].rating)
                    })
                })
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

const getMonthlyEnrollments = (req, res) => {
    try {
        let query = `
            SELECT YEAR(created_at) as year, MONTH(created_at) AS month, COUNT(id) AS total_enrollments FROM enrollments
            WHERE YEAR(created_at)=YEAR(NOW())
            GROUP BY YEAR(created_at), MONTH(created_at) ORDER BY YEAR(created_at), MONTH(created_at)
        `

        db.query(query, (err, result) => {
            if(err) throw err;

            res.json(result);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

const getCategoryEnrollments = (req, res) => {
    try {
        let query = `
            SELECT cat.id AS category_id, COUNT(e.id) AS total_enrollments FROM enrollments AS e
            INNER JOIN courses AS c ON e.course_id=c.id INNER JOIN categories AS cat ON c.category_id=cat.id
            GROUP BY cat.id;
        `;

        db.query(query, (err, result) => {
            if(err) throw err;

            res.json(result);
        })
    } catch (err){
        console.log(err);
        res.status(500).json({error: err.message});
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
    getTeacherCourses,
    changeLessonStatus,
    completeCourse,
    removeCompletedCourse,
    getCompletedCourses,
    createSection,
    createLesson,
    removeSection,
    removeLesson,
    removeCourse,
    getMyRatings,
    rateCourse,
    updateCourseRating,
    getMonthlyEnrollments,
    getCategoryEnrollments
}