const userLogin='select * from user where name=?'  //用户登录 
const userInfo='select * from user where id=?'  //获取用户信息
const createDB='CREATE DATABASE test_db'  //创建数据库

module.exports={
    userLogin,
    createDB,
    userInfo
}