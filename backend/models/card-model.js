const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema(
    {
        title: { type: String, required: true },
        ownerEmail: {type: String, required: true},
        image: { type: String },
        websiteLink: { type: String },
        likes: {type: Number, required: true},
        dislikes: {type: Number, required: true},
        description: {type: String, required: true},
        tags: {type: [String], required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Card', CardSchema)
