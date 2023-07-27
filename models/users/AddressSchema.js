const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    line1: {
      required: [true, "Address line 1  is required"],
      type: String,
    },
    line2: {
      required: [true, "Address line 2  is required"],
      type: String,
    },
    city: {
      required: [true, "city is required"],
      type: String,
    },
    state: {
      required: [true, "state is required"],
      type: String,
    },
    country: {
      required: [true, "country is required"],
      type: String,
    },
    zip: {
      required: [true, "zip is required"],
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

module.exports = mongoose.model("Address", AddressSchema);
