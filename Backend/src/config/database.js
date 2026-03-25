const mongoose = require("mongoose")

function connectToDB() {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log("Connected to DB")
            })
    } catch (error) {
        console.log("Connection Error", error)
    }
}

module.exports = connectToDB