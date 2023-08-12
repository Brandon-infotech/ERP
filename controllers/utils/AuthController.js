import userModel from "../../models/users/UserSchema.js";
import JWT from "jsonwebtoken";
import {
  comparePassword,
  hashPassword,
} from "../../passwordAuth/passwordAuth.js";

export const userRegisterCtrl = async (req, res) => {
  try {
    const {name,email,password,phone,address,bankDetails,profilePhoto,role,status,position,} = req.body;
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(500).send({
        success: true,
        message: "Already Register please login",
      });
      // res.redirect('/login')
    }

    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      profilePhoto: profilePhoto,name,email,password: hashedPassword,phone,address,role,bankDetails,status,position,}).save();
    // token
    const token = JWT.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // res.redirect("/login");
    return res.status(200).send({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        bankDetails: user.bankDetails,
        profilePhoto: user.profilePhoto,
        role: user.role,
        status: user.status,
        position: user.position,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const userLoginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    // token
    const token = JWT.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // if (user.role !==1) {
    return res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const user = await userModel.find().populate({path:"address",select:'line1 line2 '}).populate({path:'bankDetails',select:'bankName branchName'}) ;
    res.status(200).json({
      success: true,
      message: "All Users ",
      user,
    });
  } catch (error) {
    res.status(401).send({
      message: "Error in getting all users",
    });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,address,email,phone,status,position,role,profilePhoto,bankDetails} = req.body;
    // console.log(id);
    const user = await userModel.findByIdAndUpdate(id, {
      name: name,
      status: status,
      email: email,
      phone: phone,
      address: address,
      bankDetails:bankDetails,
      position: position,
      profilePhoto: profilePhoto,
      role: role,
    });
    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error in updating",
    });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(401).json({
      message: "Error while deleting",
      success: false,
    });
  }
};

export const getSingleUser=async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await userModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "User Details",
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error in getting single user",
      success: false,
    })
  }
}
