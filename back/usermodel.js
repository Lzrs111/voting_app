import mongoose from "mongoose"
var Schema = mongoose.Schema



const userSchema = new Schema({
    username: String,
    password: String,
    votedOn:[],
    created:[]
});


export default mongoose.model("user",userSchema)