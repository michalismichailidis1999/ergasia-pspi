-- Create and use database
CREATE DATABASE pspi;
USE pspi;

--  Tables
CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    photoURL VARCHAR(255) DEFAULT '/assets/userImages/user.png',
    role ENUM('teacher', 'student', 'admin') DEFAULT 'student'
);

CREATE TABLE categories(
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255)
);

CREATE TABLE courses(
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    photoURL VARCHAR(255),
    description VARCHAR(3000),
    enrolls INT DEFAULT 0,
    rating TINYINT DEFAULT 0,
    category_id INT,
    teacher_id INT,
    KEY categoryID(category_id),
    CONSTRAINT categoryID FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL,
    KEY teacherID(teacher_id),
    CONSTRAINT teacherID FOREIGN KEY(teacher_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE sections(
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    course_id INT,
    KEY courseID(course_id),
    CONSTRAINT courseID FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE lessons(
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    pdfURL VARCHAR(255),
    completed BOOL DEFAULT FALSE,
    section_id INT,
    KEY sectionID(section_id),
    CONSTRAINT sectionID FOREIGN KEY(section_id) REFERENCES sections(id) ON DELETE CASCADE
);

CREATE TABLE enrollments(
	id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY studentID(student_id),
    CONSTRAINT studentID FOREIGN KEY(student_id) REFERENCES users(id) ON DELETE CASCADE,
    KEY enrolledCourseID(course_id),
    CONSTRAINT enrolledCourseID FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE completed_courses(
	id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    KEY studentID2(student_id),
    CONSTRAINT studentID2 FOREIGN KEY(student_id) REFERENCES users(id) ON DELETE CASCADE,
    KEY completedCourseID(course_id),
    CONSTRAINT completedCourseID FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE course_ratings(
	id INT AUTO_INCREMENT PRIMARY KEY,
    rating TINYINT,
    student_id INT,
    course_id INT,
    KEY studentID3(student_id),
    CONSTRAINT studentID3 FOREIGN KEY(student_id) REFERENCES users(id) ON DELETE CASCADE,
    KEY ratedCourseID(course_id),
    CONSTRAINT ratedCourseID FOREIGN KEY(course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- TO INSERT USERS USE POSTMAN OR THE WEBSITE TO HAVE ENCRYPTED PASSWORDS
-- USERS I CREATED (john@gmail.com, jane@gmail.com, testadmin@gmail.com)

-- CATEGORY INSERTIONS
INSERT INTO categories(title) VALUE('Computer Science');
INSERT INTO categories(title) VALUE('Maths');
INSERT INTO categories(title) VALUE('Physics');
INSERT INTO categories(title) VALUE('Chemistry');
INSERT INTO categories(title) VALUE('History');
INSERT INTO categories(title) VALUE('Foreign Languages');

-- COURSE INSERTIONS
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('Linear Algebra', '/assets/courseImages/linear-algebra.png', 'Complete course for Linear Algebra. Learn everything from basics to advanced.', 2, 2);
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('CSS', '/assets/courseImages/css-course.jpg', 'Learn CSS in just 2 hours.', 1, 2);
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('AWS', '/assets/courseImages/aws-course.jpg', 'Complete course for AWS. Learn everything from basics to advanced.', 1, 2);
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('Excel', '/assets/courseImages/excel-course.png', 'Complete course for Excel from A-Z.', 1, 2);
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('React', '/assets/courseImages/react-course.jpg', 'Learn how to create your own websites using React Js.', 1, 2);
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('Data Science', '/assets/courseImages/datascience-course.png', 'Learn the basics for Data Science. This course will provide you the essentials needed to become a data analyst.', 1, 2);
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('HTML', '/assets/courseImages/html-course.jpg', 'Learn HTML in just 2 hours.', 1, 2);
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('Responsive Websites', '/assets/courseImages/responsive-design-course.png', 'Learn how to make responsive websites using CSS.', 1, 2);
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('Python', '/assets/courseImages/python-course.jpg', 'Learn the basics for python in 4 hours.', 1, 2);
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('Fullstack application with React & Express', '/assets/courseImages/fullstack-app-course.png', 'Create a social media application using React Js & Express js.', 1, 2);
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('Javascript', '/assets/courseImages/js-course.jpg', 'Learn the basics for javascript in 3 hours.', 1, 2);
INSERT INTO courses(title, photoURL, description, category_id, teacher_id) 
VALUES('Tensorflow', '/assets/courseImages/tensorflow-course.jpg', 'Learn tensorflow in just 7 hours.', 1, 2);

-- SECTION INSERTIONS
INSERT INTO sections(title, course_id) VALUES('Section 1', 1);
INSERT INTO sections(title, course_id) VALUES('Section 2', 1);

-- LESSON INSERTIONS
INSERT INTO lessons(title, pdfURL, section_id) VALUES('Introduction to Linear Algebra', '/assets/pdfs/linear-algebra-course.pdf', 1);
INSERT INTO lessons(title, pdfURL, section_id) VALUES('Introduction to Linear Algebra 2', '/assets/pdfs/linear-algebra-course.pdf', 1);
INSERT INTO lessons(title, pdfURL, section_id) VALUES('Introduction to Linear Algebra 3', '/assets/pdfs/linear-algebra-course.pdf', 1);

INSERT INTO lessons(title, pdfURL, section_id) VALUES('Introduction to Linear Algebra 4', '/assets/pdfs/linear-algebra-course.pdf', 2);
INSERT INTO lessons(title, pdfURL, section_id) VALUES('Introduction to Linear Algebra 5', '/assets/pdfs/linear-algebra-course.pdf', 2);
INSERT INTO lessons(title, pdfURL, section_id) VALUES('Introduction to Linear Algebra 6', '/assets/pdfs/linear-algebra-course.pdf', 2);

-- ENROLLMENT INSERTIONS
INSERT INTO enrollments(student_id, course_id) VALUES(3, 1);
INSERT INTO enrollments(student_id, course_id) VALUES(3, 2);
INSERT INTO enrollments(student_id, course_id) VALUES(3, 3);

-- UPDATE SOME ROLES
UPDATE users SET role='teacher' WHERE email='john@gmail.com';
UPDATE users SET role='admin' WHERE email='testadmin@gmail.com';

-- SELECT QUERIES
SELECT * FROM users;
SELECT * FROM categories;
SELECT * FROM courses;
SELECT * FROM sections;
SELECT * FROM lessons;
SELECT * FROM enrollments;
SELECT * FROM completed_courses;
SELECT * FROM course_ratings;

SELECT * FROM courses WHERE id NOT IN (SELECT c.id FROM courses AS c INNER JOIN enrollments AS e ON c.id=e.course_id WHERE e.student_id=3);

SELECT * FROM courses WHERE id NOT IN (SELECT c.id FROM courses AS c INNER JOIN enrollments AS e ON c.id=e.course_id WHERE e.student_id=3) AND category_id=1;

SELECT YEAR(created_at) as year, MONTH(created_at) AS month, COUNT(id) AS total_enrollments FROM enrollments
WHERE YEAR(created_at)=YEAR(NOW())
GROUP BY YEAR(created_at), MONTH(created_at) ORDER BY YEAR(created_at), MONTH(created_at);

SELECT cat.id AS category_id, COUNT(e.id) AS total_enrollments FROM enrollments AS e
INNER JOIN courses AS c ON e.course_id=c.id INNER JOIN categories AS cat ON c.category_id=cat.id
GROUP BY cat.id;








