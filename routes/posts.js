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
    const list = await Post.find({ _id: id });
    const model = list[0];
    if (model !== undefined && req.body != undefined) {
        model.name = req.body.name;
        model.tags = req.body.tags;
        model.type = req.body.type;
        model.image = req.body.image;
        model.content = req.body.content;
        model.likes = req.body.likes;
        model.comments = req.body.comments;

        await Post.findByIdAndUpdate(id, model);

        await successHandle(res);
    } else {
        errorHandle(res);
    }
});

router.delete('/', async (req, res, next) => {
    await Post.deleteMany({});

    await successHandle(res);
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const list = await Post.find({ _id: id });
        const model = list[0];
        if (model !== undefined) {
            await Post.findByIdAndDelete(id);
            successHandle(res);
        } else {
            errorHandle(res);
        }
    } catch(error) {
        errorHandle(res);
    }
});

module.exports = router;