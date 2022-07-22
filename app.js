const express = require('express')
const app = express()



const { expressjwt } = require('express-jwt')
const secretKey = 'jonehoo'
// 设置跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderField')
    next();
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static('./public'))
app.use(expressjwt({ secret: secretKey, algorithms: ["HS256"] }).unless({ path: ['/api/user/login', '/api/user/register'] }))



app.use('/', require('./router'))


app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.send({ code: 404, msg: '无效token' })
    }
    res.send({ code: 500, msg: '未知错误' })
})

app.listen(3000, () => {
    console.log('服务器已启动http://127.0.0.1:3000')
})