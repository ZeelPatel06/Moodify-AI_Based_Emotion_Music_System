const dotenv = require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectToDB = require("./config/database")
const cookieParser = require("cookie-parser")

const app = express()

connectToDB()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Routes
const authRouter = require("./routes/auth.routes")
app.use("/api/auth", authRouter)

const songRouter = require("./routes/song.routes")
app.use("/api/song", songRouter)

module.exports = app