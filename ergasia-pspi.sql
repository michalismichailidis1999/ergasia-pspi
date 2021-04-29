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
    photoURL VARCHAR(255) DEFAULT '/assets/images/user.png',
    role ENUM('teacher', 'student', 'admin') DEFAULT 'student'
);

CREATE TABLE categories(
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255)
);

CREATE TABLE courses(
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    photoURL VARCHAR(255),
    description VARCHAR(3000),
    enrolls INT DEFAULT 0,
    rating TINYINT,
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
    section_id INT,
    KEY sectionID(section_id),
    CONSTRAINT sectionID FOREIGN KEY(section_id) REFERENCES sections(id) ON DELETE CASCADE
);

CREATE TABLE enrollments(
	id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
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



















