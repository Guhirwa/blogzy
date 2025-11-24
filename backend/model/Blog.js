const mongoose = require('mongoose');

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    body: {
        type: String,
        required: true,
        minlength: 10
    },
    author: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String,
        default: ""
    }, timestamps: true
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;