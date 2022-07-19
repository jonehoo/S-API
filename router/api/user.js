const express = require('express')
const router = express.Router()

const { db } = require('../../db/config')
const { userLogin, userInfo } = require('../../db/sql')

const jwt = require('jsonwebtoken')
const secretKey = 'jonehoo'

router.get('/login', (req, res) => {
    let username = req.query.username
    let password = req.query.password
    db.query(userLogin, username, (err, results) => {
        if (err) {
            res.send({
                code: 400,
                msg: '登录失败'
            })
        }
        if (results.length == 0) {
            res.send({
                code: 401,
                msg: '用户不存在'
            })
        } else if (password != results[0].password) {
            console.log("res:", results)
            res.send({
                code: 402,
                msg: '密码错误'
            })
        } else {
            console.log(results)
            const tokenStr = jwt.sign({ userID: results[0].id }, secretKey, { expiresIn: '2h' })
            res.send({
                code: 200,
                msg: '登录成功',
                token: `Bearer ${tokenStr}`
            })
        }
    })
})
router.get('/userInfo', (req, res) => {
    console.log(req.auth)
    let id = req.auth.userID
    db.query(userInfo, id, (err, results) => {
        if (err) {
            res.send({
                code: 400,
                msg: '获取用户信息失败'
            })
        }
        res.send({
            code: 200,
            msg: '获取用户信息成功',
            data:results[0]
        })
    }) 
})


module.exports = router