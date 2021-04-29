const express = require("express")
const dotenv = require("dotenv")
const db = require("./config/db")

dotenv.config();

// Route Imports
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

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

// Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)

const PORT = parseInt(process.env.PORT)

app.listen(PORT, () => console.log(`Servere started on port ${PORT}...`))