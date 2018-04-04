import mongoose from 'mongoose' 
import Model from './model.js' 


var url = 'mongodb://Lzrs:neowolf834@ds231529.mlab.com:31529/polls'
var connection = mongoose.connect(url)


function getPolls() {
    return Model.find({},(error,res)=>{
        if (error) throw error
        console.log(' got data from database')
        console.log(res)
        return Object.assign({},res)
        })
}

function generateOptions(data) {
    var keys = Object.keys(data)
    var p  =  keys.map((value,index)=>{
        return {text: data[value],votes:0};           
    })
    console.log('returningp')
   return p
};

function newPoll(data) {
    return new Promise((resolve)=>{

        const poll = new Model({
            question: data['question'],
            options: generateOptions(data['choices']),
            totalVotes: 0
        });

        poll.save((error) => {
            if (error) throw error
            console.log('added poll to db')
            resolve()
        })
    })
}
function deletePoll(id) {
    return new Promise((resolve,reject)=>{
        Model.deleteOne({_id:id},(error)=>{
            if (error) throw error
            resolve()
            })
        })
}

function updatePoll(data) {
    data = JSON.parse(data)
    return new Promise((resolve,reject)=>{
        Model.findOneAndUpdate({_id:data[0],"options._id":data['2']},{$inc: {totalVotes:1,"options.$.votes":1}},(error,document)=>{
            if (error) throw error
            resolve()
            })
        })
    
}

module.exports ={getPolls,newPoll,deletePoll,updatePoll}