const { db } = require('../db/config')

const avatar = (req, res) => {
    console.log(req.newFilename)
    let file=req.file
    try {
        if (!req.file) {
            res.send({
                code: 400,
                msg: '头像不能为空'
            });
        } else {
            res.send({
                code: 200,
                msg: '头像上传成功',
                data: {
                    name: file.originalname,
                    type: file.mimetype,
                    size: file.size,
                    path: `/public/avatar/${req.newFilename}`
                }
            });
        }
    } catch (err) {
        res.send({
            code: 500,
            msg: '未知错误'
        });
    }

}

module.exports = {
    avatar
}