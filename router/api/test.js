
const express = require('express')
const router = express.Router()

const {db}=require('../../db/config')
const {allUser}=require('../../db/sql')
router.get('/get', (req, res) => {
    db.query(allUser,(err,results)=>{
        if(err) res.send(err)
        console.log(results)
        res.send(results)
    })
    
})

router.post('/post', (req, res) => {
    console.log(req.auth)
    console.log(req.body)
    res.send(req.body)
})

module.exports = router