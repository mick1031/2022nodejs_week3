const Post = require('../models/PostSchema');

async function successHandle(res) {
    res.status(200)
        .json({
            status: "success",
            data: await Post.find(),
        });
}

module.exports = successHandle;