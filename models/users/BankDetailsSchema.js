import mongoose from "mongoose";

const BankSchema = new mongoose.Schema(
  {
    bankName: {
      required: [true, "bankname is required"],
      type: String,
    },
    branchName: {
            required: [true, "branchName is required"],
      type: String,
    },
    holderName: {
            required: [true, "holderName is required"],
      type: String,
    },
    ifsc: {
            required: [true, "ifsc is required"],
      type: String,
    },
    upiId: {
            required: [true, "upiId is required"],
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default  mongoose.model("Bank", BankSchema);
