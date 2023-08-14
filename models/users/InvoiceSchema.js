import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        services:[
            {
                heading:{
                    type: String,
                    required: true
                },
                subheading:[{
                    type: String,
                    required: true
                }]
            }
        ],
        amount:{
            type: Number,
            required: true
        },
        status:{
            type: String,
            required: true,
            enum:['paid','unpaid','half paid']
        },

},
    {
        timestamps: true,
     }
)

export default mongoose.model("invoice", invoiceSchema);