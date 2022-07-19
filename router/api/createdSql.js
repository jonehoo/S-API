
const express = require('express')
const router = express.Router()

const {db}=require('../../db/config')
const {createDB}=require('../../db/sql')
router.get('/add', (req, res) => {
    db.query(createDB,(err,results)=>{
        if(err) res.send(err)
        console.log(results)
        res.send(results)
    })
    
})



module.exports = router