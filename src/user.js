const { db } = require('../db/config')
const { alluserSQL,userLoginSQL, userInfoSQL, registerSQL ,reviseSQL} = require('../db/sql')

const jwt = require('jsonwebtoken')
const secretKey = 'jonehoo'
const bcrypt = require('bcryptjs')

const alluser=(req, res) => {
    let id = req.auth.userID
    db.query(userInfoSQL,id, (err, results) => {
        try {
            if(results.length==0){
                res.send({
                    code: 500,
                    msg: '权限不足'
                });
            }else if(results[0].role=="admin"){
                db.query(alluserSQL,(err,results)=>{
                    try{
                        if(results.length==0){
                            res.send({
                                code:400,
                                msg:"用户表为空"
                            })
                        }else{
                            res.send({
                                code:200,
                                msg:"查询成功",
                                data:results,
                                count:results.length
                            })  
                        }
                    }catch(err){
                        res.send({
                            code: 500,
                            msg: '未知错误'
                        });
                    }
                })
            }else{
                res.send({
                    code: 500,
                    msg: '权限不足'
                });
            }
        } catch (err) {
            res.send({
                code: 500,
                msg: '未知错误'
            });
        }
    })

    
    
}
const login = (req, res) => {
    let username = req.query.username
    let password =req.query.password

    db.query(userLoginSQL, username, (err, results) => {
        // const isPasswordValid = bcrypt.compareSync(JSON.stringify(password), results[0].password);
        if (err) {
            res.send({
                code: 400,
                msg: '登录失败'
            })
            throw error;
        }
        if (results.length == 0) {
            res.send({
                code: 401,
                msg: '用户不存在'
            })
        } else if (!bcrypt.compareSync(JSON.stringify(password), results[0].password)) {
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
}
const userInfo = (req, res) => {
    console.log("解析token",req.auth)
    let id = req.auth.userID
    db.query(userInfoSQL, id, (err, results) => {
        if (err) {
            res.send({
                code: 400,
                msg: '获取用户信息失败'
            })
        }
        res.send({
            code: 200,
            msg: '获取用户信息成功',
            data: results[0]
        })
    })
}
const register = (req, res) => {
    var params = [req.body.username, req.body.password]
    if (params[0] == '' || params[1] == '') {
        res.send({
            code: 402,
            msg: '账户或密码不能为空'
        })
    } else {
        db.query(userLoginSQL, params[0], (err, results) => {
            if (err) {
                res.send({
                    code: 400,
                    msg: '未知错误'
                })
            }
            if (results.length > 0) {
                res.send({
                    code: 201,
                    msg: '用户已存在'
                })
            } else {
                params[1] = bcrypt.hashSync(JSON.stringify(params[1]), 10)
                db.query(registerSQL, params, (err, results) => {
                    if (err) {
                        res.send({
                            code: 400,
                            msg: '未知错误'
                        })
                    } else {
                        res.send({
                            code: 200,
                            msg: '注册成功'
                        })
                    }

                })
            }
        })
    }
}
const revise=(req, res) =>{
    console.log(req.auth)
    console.log(req.body)
    let id = req.auth.userID
    let newPassword=bcrypt.hashSync(JSON.stringify(req.body.newPassword), 10)
    
    db.query(reviseSQL,[newPassword,id],(err,results)=>{
        if(err){
            res.send({
                code:404,
                msg:"未知错误"
            })
        }else{
            res.send({
                code:200,
                msg:"修改成功"
            })
        }
    })
 
}

module.exports = {
    login,
    userInfo,
    register,
    revise,
    alluser
}