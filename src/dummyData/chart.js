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
                data: [25467, 58983, 12003, 6789, 4000, 80125],
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
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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