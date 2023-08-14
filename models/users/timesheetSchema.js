import mongoose from "mongoose";

const timesheetSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description:[
       { 
            startTime:{
                type: String,
                // required: true
            },
            endTime:{
                type: String,
                // required: true
            },
            task:{
                type: String,
                required: true
            }
       }
    ],
    status:{
        type: String,
        required: true,
        enum:['reviewed', 'pending']
    }
})

export default mongoose.model("Timesheet", timesheetSchema);