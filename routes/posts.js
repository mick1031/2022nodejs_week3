var express = require('express');
var router = express.Router();
const Post = require('../models/PostSchema');
const errorHandle = require('../handle/errorHandle');
const successHandle = require('../handle/successHandle');


router.get('/', async (req, res, next) => {
    await successHandle(res);
});

router.post('/', async (req, res, next) => {
    try {
        const model = {
            name: req.body.name,
            tags: req.body.tags,
            type: req.body.type,
            image: req.body.image,
            content: req.body.content,
            likes: req.body.likes,
            comments: req.body.comments
        };

        await Post.create(model);

        await successHandle(res);
    } catch (error) {
        errorHandle(res);
    }
});

router.patch('/:id', async (req, res, next) => {
    const id = req.params.id;
    const model = {
        name: req.body.name,
        tags: req.body.tags,
        type: req.body.type,
        image: req.body.image,
        content: req.body.content,
        likes: req.body.likes,
        comments: req.body.comments,
    };
    const result = await Post.findByIdAndUpdate(id, model);
    if (result) {
        await successHandle(res);
    } else {
        errorHandle(res);
    }
});

router.delete('/', async (req, res, next) => {
    if (req.originalUrl == '/posts/') {
        await Post.deleteMany({});
        await successHandle(res);
    } else {
        errorHandle(res);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Post.findByIdAndDelete(id);
        if (result) {
            successHandle(res);
        } else {
            errorHandle(res);
        }
    } catch (error) {
        errorHandle(res);
    }
});

module.exports = router;