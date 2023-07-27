const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema(
  {
    bankname: {
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bank", BankSchema);
