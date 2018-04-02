import mongoose from 'mongoose' 
var Schema = mongoose.Schema 

const o = new Schema({
    votes:Number,
    text: String
});

const p = new Schema({
    question:String,
    options:[o],
    totalVotes: Number
});
export default mongoose.model("poll",p)