import 'babel-polyfill'
import express from 'express' 
import {getPolls,newPoll,deletePoll,updatePoll,updateIp,registerUser,loginUser,logoutUser,fetchUserPolls} from './crud.js' 

var ap = express()

//basic route
ap.use('/',express.static(__dirname,{index:'index.html'})).listen(process.env.PORT || 3000,()=>{
    console.log('server started')
    })

//fetch all polls
ap.get('/polls',async (req,res)=>{
    res.send(await getPolls())
    })

//POST route to add a new poll, also fetches polls at the end
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

//DELETE route to delete a poll and send new updated polls to frontend
ap.delete('/del',(req,res)=>{
    req.on('data',async(data)=>{
        try {
            await deletePoll(data)
            res.send(await getPolls())
        } catch (error) {
            throw error
        }
    })
})

//update a particular poll
ap.post('/update',(req,res)=>{
    req.on('data',async (data)=>{
        // try to update poll. If it works, fetch new data and send to front end
        try {
            await updatePoll(data)
            res.send(await getPolls())
        } catch (reason){
            console.log("reason",reason)
            res.writeHead(401,reason)
            res.end(JSON.stringify(reason))
        }  
    })
})

//register new user
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
     
//log in user
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

//log out user
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

//fetch poll
ap.post("/userpolls",(req,res)=>{
    req.on("data",async(data)=>{
        try {
           var polls = await fetchUserPolls(data)            
           res.send(JSON.stringify(polls))
        } catch (error) {
            if (error) throw error
        }
        })
})