const express = require('express')

const router = express.Router()
var multer = require ('multer');

const {avatar}=require('../../src/uploads')
var stroage = multer.diskStorage({
    //设置上传的文件夹
    destination: function (req, file, cd) {
        cd(null, './public/avatar') //注意是根目录，根目录，根目录
    },
    filename: function (req, file, cb) {
        let newFilename=`${Date.now()}-${file.originalname}`
        req.newFilename=newFilename
        cb(null, newFilename)
    }
})
const uploadAvatar=multer({ storage: stroage });// 配置头像存储位置
router.post('/avatar',uploadAvatar.single('avatar'), avatar)

module.exports = router