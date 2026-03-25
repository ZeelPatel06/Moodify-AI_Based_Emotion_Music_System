const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "the url is required."]
    },
    posterUrl: {
        type: String,
        required: [true, "the poster is required."]
    },
    title: {
        type: String,
        required: [true, "the title is required."]
    },
    mood: {
      type: String,
      enum: ["happy", "sad", "surprised"]
    }
})

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel;