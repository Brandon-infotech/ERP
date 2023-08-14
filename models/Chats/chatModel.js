import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatName:{
        type:String,
        required:true,
        trim:true
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    allMessage:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }],
},
{
    timestamps:true
})

export default mongoose.model("Chat",chatSchema);