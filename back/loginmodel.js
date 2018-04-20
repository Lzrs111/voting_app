import mongoose from "mongoose";
var Schema = mongoose.Schema


var activeUserSchema = new Schema({
    activeUsers: []
})

export default mongoose.model("active users",activeUserSchema)