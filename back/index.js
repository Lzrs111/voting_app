import express from 'express' 
import {getPolls,newPoll,deletePoll,updatePoll,updateIp} from './crud.js' 

var ap = express()

ap.use('/',express.static(__dirname,{index:'index.html'})).listen(process.env.PORT || 3000,()=>{
    console.log('server started')
    })

ap.get('/polls',(req,res)=>{
    getPolls().then((data)=>{
        res.json(data)
        }).catch((error)=>{
            if (error) throw error
            })
    })

ap.post('/add',(req,res)=>{
    req.on('data',(data)=>{
        data = JSON.parse(data)
        // insert new poll  into database, then retrieve polls from database and send to front-end
        newPoll(data).then(()=>{
            return getPolls()
            })
            .then((data)=>{
                res.send(data)
            })
            .catch((error)=>{
                if (error) throw error
            })
        })
    })

ap.delete('/del',(req,res)=>{
    req.on('data',(data)=>{
        // delete poll from DB, retrieve polls from db and send to front-end
        deletePoll(data).then((data)=>{
            return getPolls()    
            }).then((data)=>{
               res.send(data) 
            }).catch((error)=>{
                if (error) throw error
            })
        })
    })

ap.post('/update',(req,res)=>{
    req.on('data',(data)=>{
        console.log("recieved data, validating")
        
        var prom = new Promise((resolve,reject)=>{
            updatePoll(data).then(
                (success)=>{
                    resolve(getPolls())
                },
                (reason)=>{
                    reject(reason)
                })
        
        })
        
        prom.then(
            (succ)=>{
            res.send(succ)
            },
            (reason)=>{
            console.log(reason,"lol")
            res.send(JSON.stringify(reason))
            })
            .catch((error)=>{
                if (error) throw error
            })
    })
})



