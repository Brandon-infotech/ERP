import mongoose from "mongoose";

const PayrollSchema = new mongoose.Schema(
  {
    userName: {
      required: [true, "userName is required"],
      type: String,
    },
    total: {
            required: [true, "branchName is required"],
      type: Number,
    },
    amount: {
            required: [true, "holderName is required"],
      type: Number,
    },
    status: {
            required: [true, "status is required"],
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default  mongoose.model("payroll", PayrollSchema);
