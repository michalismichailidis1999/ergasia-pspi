const courses = [
    {
        id: 1,
        title: "Linear Algebra",
        imgSrc: "/assets/images/linear-algebra.png",
        description: "Complete course for Linear Algebra. Learn everything from basics to advanced.",
        category: "Maths",
        enrolls: 100,
        rating: 4.5,
        teacherId: 2
    },
    {
        id: 2,
        title: "CSS",
        imgSrc: "/assets/images/css-course.jpg",
        description: "Learn CSS in just 2 hours.",
        category: "Computer Science",
        enrolls: 90,
        rating: 4,
        teacherId: 2
    },
    {
        id: 3,
        title: "AWS",
        imgSrc: "/assets/images/aws-course.jpg",
        description: "Complete course for AWS. Learn everything from basics to advanced.",
        category: "Computer Science",
        enrolls: 80,
        rating: 3.3,
        teacherId: 2
    },
    {
        id: 4,
        title: "Excel",
        imgSrc: "/assets/images/excel-course.png",
        description: "Complete course for Excel from A-Z.",
        category: "Computer Science",
        enrolls: 70,
        rating: 5,
        teacherId: 2
    },
    {
        id: 5,
        title: "React",
        imgSrc: "/assets/images/react-course.jpg",
        description: "Learn how to create your own websites using React Js.",
        category: "Computer Science",
        enrolls: 140,
        rating: 5,
        teacherId: 2
    },
    {
        id: 6,
        title: "Data Science",
        imgSrc: "/assets/images/datascience-course.png",
        description: "Learn the basics for Data Science. This course will provide you the essentials needed to become a data analyst.",
        category: "Computer Science",
        enrolls: 250,
        rating: 2,
        teacherId: 2
    },
    {
        id: 7,
        title: "HTML",
        imgSrc: "/assets/images/html-course.jpg",
        description: "Learn HTML in just 2 hours.",
        category: "Computer Science",
        enrolls: 400,
        rating: 2.5,
        teacherId: 2
    },
    {
        id: 8,
        title: "Responsive Websites",
        imgSrc: "/assets/images/responsive-design-course.png",
        description: "Learn how to make responsive websites using CSS.",
        category: "Computer Science",
        enrolls: 40,
        rating: 4.5,
        teacherId: 2
    },
    {
        id: 9,
        title: "Python",
        imgSrc: "/assets/images/python-course.jpg",
        description: "Learn the basics for python in 4 hours.",
        category: "Computer Science",
        enrolls: 430,
        rating: 4,
        teacherId: 2
    },
    {
        id: 10,
        title: "Fullstack application with React & Express",
        imgSrc: "/assets/images/fullstack-app-course.png",
        description: "Create a social media application using React Js & Express js.",
        category: "Computer Science",
        enrolls: 180,
        rating: 3.1,
        teacherId: 2
    },
    {
        id: 11,
        title: "Javascript",
        imgSrc: "/assets/images/js-course.jpg",
        description: "Learn the basics for javascript in 3 hours.",
        category: "Computer Science",
        enrolls: 210,
        rating: 4.8,
        teacherId: 2
    },
    {
        id: 12,
        title: "Tensorflow",
        imgSrc: "/assets/images/tensorflow-course.jpg",
        description: "Learn tensorflow in just 7 hours.",
        category: "Computer Science",
        enrolls: 135,
        rating: 5,
        teacherId: 2
    },
]

export const sections = [
    {
        id: 1,
        courseId: 1,
        title: "Section 1",
        lessons: [
            {
                id: 1,
                sectionId: 1,
                pdfURL: "/assets/pdfs/linear-algebra-course.pdf",
                title: "Introduction to Linear Algebra"
            },
            {
                id: 2,
                sectionId: 1,
                pdfURL: "/assets/pdfs/linear-algebra-course.pdf",
                title: "Introduction to Linear Algebra 2"
            },
            {
                id: 3,
                sectionId: 1,
                pdfURL: "/assets/pdfs/linear-algebra-course.pdf",
                title: "Introduction to Linear Algebra 3"
            }
        ]
    },
    {
        id: 2,
        courseId: 1,
        title: "Section 2",
        lessons: [
            {
                id: 4,
                sectionId: 2,
                pdfURL: "/assets/pdfs/linear-algebra-course.pdf",
                title: "Introduction to Linear Algebra 4"
            },
            {
                id: 5,
                sectionId: 2,
                pdfURL: "/assets/pdfs/linear-algebra-course.pdf",
                title: "Introduction to Linear Algebra 5"
            },
            {
                id: 6,
                sectionId: 2,
                pdfURL: "/assets/pdfs/linear-algebra-course.pdf",
                title: "Introduction to Linear Algebra 6"
            }
        ]
    },
]

export default courses;