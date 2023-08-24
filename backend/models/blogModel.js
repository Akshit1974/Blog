const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: false,
    },
    title: {
        type: String,
        required: true,
        min: 4
    },
    description: {
        type: String,
        required: true,
        min: 12
    },
    photo: {
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
    },
    statusCode: {
        type: Number,
        default: 1,
    },
    category: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: [String],
        default: [],
    }

}, { timestamps: true });

module.exports = mongoose.model("Blogs", blogSchema);