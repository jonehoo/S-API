
const mysql=require('mysql')

const db=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"000062aa",
    database:"sadmindb",
})

module.exports={db}
