function errorHandle(res) {
    res.status(404)
        .json({
            status: false,
            message: "欄位未填寫正確，或無此 post id"
        });
}

module.exports = errorHandle;