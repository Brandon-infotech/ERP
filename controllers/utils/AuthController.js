const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/UserSchema");
const {generateToken} = require("../../config/token/generateToken");

const userLoginCtrl = expressAsyncHandler(async (req, res) => {
    const userExists = await User.findOne({
      email: req?.body?.email,
    });
    //check password
    
    if(userExists && await userExists.isPasswordMatched(req?.body?.password)){
      res.json({
          firstName : userExists?.firstName,
          lastName : userExists?.lastName,
          email : userExists?.email,
          id : userExists?._id,
          isAdmin : userExists?.isAdmin,
          token: generateToken(userExists?.id),
          profilePhoto : userExists?.profilePhoto
      })
      
    }else{
      res.status(401)
      throw new Error("Invalid Credentials")
    }
  });

module.exports = {
    userLoginCtrl
}