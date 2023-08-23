import mongoose from "mongoose";

const PayrollSchema = new mongoose.Schema(
  {
    userName: {
      type: mongoose.Schema.ObjectId,
      required: [true, "userName is required"],
      // type: String,
    },
    amount: {
      // required: true,
      type: Number,
    },
    status: {
      required: [true, "status is required"],
      type: String,
      enum: ["pending", "paid"],
    },
  },
  {
    timestamps: true,
  }
);

export default  mongoose.model("payroll", PayrollSchema);
