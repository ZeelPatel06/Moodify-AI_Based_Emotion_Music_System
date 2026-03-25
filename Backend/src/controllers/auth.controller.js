const userModel = require("../models/user.model")
const redis = require("../config/cache")
const blacklistModel = require("../models/blacklist.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const registerController = async (req, res) => {
    const { email, username, password } = req.body
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists",
        })
    }
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username, email, password: hash
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    )
    res.cookie("token", token)

    res.status(200).json({
        message: "User registered successfully.",
        user: {
            username: user.username,
            id: user._id,
            email: user.email
        }
    })
}

const loginController = async (req, res) => {
    const { username, password, email } = req.body;
    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")
    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    )
    res.cookie("token", token)

    return res.status(200).json({
        message: "User logged in successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

const getmeController = async (req, res) => {
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message: "User Fetched successfully.",
        user
    })
}

const logoutController = async (req, res) => {
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token, Date.now().toString(), "EX", 60 * 60)

    res.status(200).json({
        message: "logout successfully."
    })
}

module.exports = { registerController, loginController, getmeController, logoutController }