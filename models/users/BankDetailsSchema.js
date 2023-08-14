import mongoose from "mongoose";

const BankSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
    },
    branchName: {
      type: String,
    },
    holderName: {
      type: String,
    },
    ifsc: {
      type: String,
    },
    upiId: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

export default  mongoose.model("Bank", BankSchema);
