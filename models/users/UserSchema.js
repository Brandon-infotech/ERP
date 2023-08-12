// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      required: [true, "Email is required"],
      type: String,
    },
    phone: {
      required: [true, "Contact Number is required "],
      type: String,
      minLenght:10,
    },
    role: {
      type: Number,
      default : 2,
      enum:[1,2,3]
      // 1 : admin , 2: employee ; 3 : client
    },
    status: {
      type: Boolean,
      // True is active ; False is fired
    },
    password: {
      required: [true, "password is required"],
      type: String,
    },
    profilePhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2017/01/10/03/54/avatar-1968236_960_720.png",
    },
    position:{
      type:String,
      required:[true,"Posiiton is required"]
    },address: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
    }
    ,bankDetails: {
      type: mongoose.Schema.ObjectId,
      ref: "Bank",
    },

  },
  {
    
    timestamps: true,
  }
);

//Hash Password 
// UserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });
// UserSchema.methods.isPasswordMatched = async function(enteredPassword){
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const userModel = mongoose.model("User", UserSchema);

export default userModel;