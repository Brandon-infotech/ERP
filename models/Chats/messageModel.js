import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },content:{
        type: String,
    },
    status:{
        type: String,
        enum:['recieved','sent','deleted']
    },
    messageType:{
        type:  String,
        enum:['text','image','file','video']
    },
    isPinned:
        {
            type: Boolean,
            default: false
        }
},{
    timestamps: true
})
export default mongoose.model("Message", messageSchema);



