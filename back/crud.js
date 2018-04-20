import bcrypt from "bcryptjs"
import mongoose from 'mongoose' 
import Model from './model.js' 
import dotenv from "dotenv"
import ipModel from "./ipmodel"
import UserModel from "./usermodel"
import LoginModel from "./loginmodel"
import { SSL_OP_LEGACY_SERVER_CONNECT } from "constants";


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
        
        if (data.loggedIn) {
            await checkIfVoted(data)
        } else {
            await checkIp(data)
        }
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

function checkIfVoted(data) {
    return new Promise((resolve,reject)=>{
        UserModel.find({username:data.username},(error,res)=>{
            if (error) throw error
            if (res[0]["votedOn"].includes(data["id"])){
                reject("You have already voted on this poll")
            } else {
                UserModel.update({username:data["username"]},{$push:{votedOn:data["id"]}},(error,raw)=>{
                    if (error) throw error
                    resolve()
                    })
            }
            })
        })
}


export async function registerUser(data) {
    data = JSON.parse(data)
    try {
        await checkIfRegistered(data.username)
        let hashed = await bcrypt.hash(data.password,10)
        const user = new UserModel({
            username: data.username,
            password: hashed,
            votedOn: [],
            created: []
        })
        await user.save()
        return "Registered successfully!"
    } catch(reason) {
        return reason
    }
}

function checkIfRegistered(username) {
    return new Promise((resolve,reject)=>{
        UserModel.find({username},(err,res)=>{
            if (err) throw err
            if (res.length >0){
                reject("User already exists")
            } else {
                resolve()
            }
        })
    })
}

function checkIfActive(username) {
    return new Promise((resolve,reject)=>{
        LoginModel.find({},(error,res)=>{
            if (error) throw error
            if (res[0]["activeUsers"].includes(username)) {
                reject("User already logged in")
            } else {
                resolve()
            }
            })
        })
}

function checkIfExists(username,password) {
    return new Promise((resolve,reject)=>{
        UserModel.find({username:username},(error,res)=>{
            if (error) throw error
            
            if (res.length == 0){
                reject("User does not exist")
            } else {
                bcrypt.compare(password,res[0]["password"],(error,success)=>{
                    if (error) throw error

                    if (success){
                        resolve()
                    } else {
                        reject("Wrong password")
                    }
                })
            }
        })
    })
}

export async function loginUser(data) {
    data = JSON.parse(data)
    try {
        await checkIfActive(data.username)
        await checkIfExists(data.username,data.password) 
        await LoginModel.update({},{$push:{activeUsers:data.username}},(error)=>{
            if (error) throw error
            })
        let polls = await UserModel.find({username:data.username})
        return {userPolls: polls[0]["created"]}
    } catch (reason) {
        return Promise.reject(reason)
    }
}

export async function logoutUser(data) {
    data = JSON.parse(data)
    try {
        LoginModel.update({},{$pull: {activeUsers:data}},(err,raw)=>{
            console.log("Logged out at",Date.now().toString())
            })
    } catch (error) {
        if (error) throw error
        
    }
}