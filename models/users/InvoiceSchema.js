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
                subheading:{
                    type: String,
                    required: true
                }
            }
        ],
    },
    {
        timestamps: true,
     }
)

export default mongoose.model("invoice", invoiceSchema);