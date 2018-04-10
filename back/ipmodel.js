import mongoose from 'mongoose' 
var Schema = mongoose.Schema

const ip = new Schema({
    ip: String,
    polls: []
})

export default mongoose.model("ip",ip)