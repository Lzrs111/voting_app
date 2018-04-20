import 'babel-polyfill'
import express from 'express' 
import {getPolls,newPoll,deletePoll,updatePoll,updateIp,registerUser,loginUser,logoutUser} from './crud.js' 

var ap = express()

ap.use('/',express.static(__dirname,{index:'index.html'})).listen(process.env.PORT || 3000,()=>{
    console.log('server started')
    })

ap.get('/polls',async (req,res)=>{
    res.send(await getPolls())
    })

ap.post('/add',(req,res)=>{
    req.on('data',async (data)=>{
        data = JSON.parse(data)
        try {
            await newPoll(data)
            res.send(await getPolls())
        } catch (error){
            if (error) throw error
        }
    })
})

ap.delete('/del',(req,res)=>{
    req.on('data',async(data)=>{
        // delete poll from DB, retrieve polls from db and send to front-end
        try {
            await deletePoll(data)
            res.send(await getPolls())
        } catch (error) {
            throw error
        }
    })
})

ap.post('/update',(req,res)=>{
    req.on('data',async (data)=>{
        // try to update poll. If it works, fetch new data and send to front end
        try {
            var info = await updatePoll(data)
            if (info){
                res.send(JSON.stringify(info))
            }else {
                res.send(await getPolls())
                }
        } catch (error){
            if (error) throw error
        }  
    })
})

ap.post("/register",(req,res)=>{
    req.on("data",async (data)=>{
        try {
            var info = await registerUser(data)
            res.send(JSON.stringify(info))
        } catch (error) {
           if (error) throw error 
        }
        })
    })
        
ap.post("/login",(req,res)=>{
    req.on("data",async(data)=>{
        try {
           var info =  await loginUser(data)
           console.log(info)
           res.send(JSON.stringify(info))
        } catch (reason) {
            switch (reason) {
                case "User does not exist":
                    res.writeHead(404,reason)
                    break;
                case "Wrong password":
                case "User already logged in":
                    res.writeHead(403,reason)
                    break;
            }
            res.end(JSON.stringify(reason))
        } 
    })
})

ap.delete("/logout",(req,res)=>{
    req.on("data",async (data)=>{
        try {
           await logoutUser(data) 
           res.end()
        } catch (error) {
            if (error) throw error
        }
        })
    })