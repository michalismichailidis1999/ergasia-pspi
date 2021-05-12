const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

const categories = ["Computer Science", "Maths", "Physics", "Chemistry", "History", "Foreign Languages"]

export const pieChart = {
    data: {
        labels: categories,
        datasets: [
            {
                data: [], // insert numbers here
                label: "Categories",
                backgroundColor: [
                "rgba(185, 66, 245, 1)",
                "rgba(66, 135, 245, 1)",
                "rgba(201, 22, 52, 1)",
                "rgba(137, 86, 143)",
                "rgba(235, 226, 162)",
                "rgba(32, 74, 92)"
                ]
            }
        ]
    },
    options: {
        title: { display: true, text: "Total Enrollments", fontSize: 19 }
    }
};

export const lineChart = {
    data: {
        labels: months,
        datasets: [
            {
                data: [], // insert numbers here
                backgroundColor: "rgba(255, 0, 0, .3)",
                pointBackgroundColor: "rgba(66, 135, 245, 1)",
                label: "",
                radius: 2
            }
        ]
    },
    options: {
        title: { display: true, text: "Monthly Enrollments", fontSize: 19 },
        legend: {
            display: false
        },
        scales: {
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Enrollments"
                    }
                }
            ],
            xAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: "Months"
                    }
                }
            ]
        }
    }
};