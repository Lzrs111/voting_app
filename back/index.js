import express from 'express' 

var ap = express()

ap.use('/',express.static(__dirname,{index:'index.html'})).listen(3000,()=>{
    console.log('server started')
    })
