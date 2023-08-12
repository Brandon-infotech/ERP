import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
    attendence:{
        required:true,
        type:String,
        enum:["present","absent","half day","holiday"]
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