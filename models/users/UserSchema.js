const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      required: [true, "Name is required"],
      type: String,
    },
    email: {
      required: [true, "Email is required"],
      type: String,
    },
    contact: {
      required: [true, "Contact Number is required"],
      type: String,
    },
    role: {
      default : 2,
      type: Number,
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
    }
  },
  {
    
    timestamps: true,
  }
);

//Hash Password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.methods.isPasswordMatched = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;