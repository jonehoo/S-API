const express = require('express')
const app = express()
const cors = require('cors')

const { expressjwt } = require('express-jwt')
const secretKey = 'jonehoo'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static('./public'))
app.use(expressjwt({ secret: secretKey, algorithms: ["HS256"] }).unless({ path: ['/api/user/login'] }))




app.use('/', require('./router'))
app.use(cors)

app.use((err,req,res,next)=>{
    if(err.name==='UnauthorizedError'){
        return res.send({code:404,msg:'无效token'})
    }
    res.send({code:500,msg:'未知错误'})
})

app.listen(3000, () => {
    console.log('服务器已启动http://127.0.0.1:3000')
})