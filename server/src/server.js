const express = require("express")
const dotenv = require("dotenv")
const db = require("./config/db")
const cors = require('cors')
const fileUpload = require("express-fileupload")

dotenv.config();

// Route Imports
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const courseRoutes = require("./routes/course")
const categoryRoutes = require("./routes/category")

const app = express();

db.connect((err) => {
    if(err) {
        process.exit(1);
    }

    console.log("Connected to MYSQL Database...")
})

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use(cors())

// Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", courseRoutes)
app.use("/api", categoryRoutes)

const PORT = parseInt(process.env.PORT)

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))