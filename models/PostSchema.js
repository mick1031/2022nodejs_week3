const { Schema } = require("mongoose");
const mongoose = require('mongoose');

const postSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, 'Content 未填寫']
        },
        image: {
            type: String,
            default: ""
        },
        createdAt: {
            type: Date,
            default: Date.now,
            select: false
        },
        name: {
            type: String,
            required: [true, '貼文姓名未填寫']
        },
        likes: {
            type: Number,
            default: 0
        },
        tags: [
            {
                type: String,
            }
        ],
        type:{
            type: String
        },
    },
    {
        versionKey: false
    }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;