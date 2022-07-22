//查询所有用户
const alluserSQL='select * from user'
//用户登录 
const userLoginSQL='select * from user where username=?', 
//获取用户信息
userInfoSQL='select * from user where id=?' ,
//创建数据库
createDBSQL='CREATE DATABASE test_db', 
//用户注册
registerSQL= 'insert into user (username,password) value (?,?)',
//修改用户密码
reviseSQL="UPDATE `sadmindb`.`user` SET `password` = ? WHERE `id` = ?"
module.exports={
    userLoginSQL,
    createDBSQL,
    userInfoSQL,
    registerSQL,
    reviseSQL,
    alluserSQL
}