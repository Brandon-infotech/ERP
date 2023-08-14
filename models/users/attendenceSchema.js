import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
    user:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    attendence:{
        required:true,
        type:String,
        enum:["present","absent","half day"]
    },
    totalOfMonth:{
        required:true,
        type:Number
    },
    totalLeave:{  
        required:true,
        type:Number
    }
},{
    timestamps:true
})

export default mongoose.model("attendence",attendenceSchema);