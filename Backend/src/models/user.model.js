const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is compulsory."]
    },
    email: {
        type: String,
        required: [true, "Email is compulsory."]
    },
    password: {
        type: String,
        required: [true, "Password is compulsory."],
        select: false
    }
}, {
    timestamps: true
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel