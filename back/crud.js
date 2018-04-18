import mongoose from 'mongoose' 
import Model from './model.js' 
import dotenv from "dotenv"
import ipModel from "./ipmodel"


dotenv.config()
var url = 'mongodb://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@ds046067.mlab.com:46067/polls2'
var connection = mongoose.connect(url)

export function getPolls() {
    return Model.find({},(error,res)=>{
        if (error) throw error
        return Object.assign({},res)
        })
}

function generateOptions(data) {
    var keys = Object.keys(data)
    var p  =  keys.map((value,index)=>{
        return {text: data[value],votes:0};           
    })
   return p
};

export function newPoll(data) {
    return new Promise((resolve)=>{

        const poll = new Model({
            question: data['question'],
            options: generateOptions(data['choices']),
            totalVotes: 0
        });

        poll.save((error) => {
            if (error) throw error
            resolve()
        })
    })
}
export function deletePoll(id) {
    return new Promise((resolve,reject)=>{
        Model.deleteOne({_id:id},(error)=>{
            if (error) throw error
            resolve()
            })
        })
}

// update a poll
export async function updatePoll(data) {
    data = JSON.parse(data)
    try {
        await checkIp(data)
        Model.findOneAndUpdate({_id:data["id"],"options._id":data['votedFor']},{$inc: {totalVotes:1,"options.$.votes":1}},(error,document)=>{
            if (error) throw error
        }) 
        } catch (reason) {
            return reason
        }
}


//this function checks if user has already voted on a particular poll
function checkIp(data) {
return new Promise((resolve,reject)=>{
    ipModel.find({ip:data["ip"]},(error,res)=>{
        if (error) throw error
        console.log(res,"res")
        if (res.length==0){
            const ip = new ipModel({
                ip: data["ip"],
                polls: [data["id"]]
            })
            ip.save((err)=>{
                resolve("updated db")
                })
        } else if (res[0]["ip"]==data["ip"]) {
            if (res[0]["polls"].includes(data["id"])){
                reject("You have already voted")
            } else {
                ipModel.update({ip:data["ip"]},{$push:{polls:data["id"]}},(err,raw)=>{
                    resolve("updated db")
                    }) 
            }
        } 
    })
})
}
