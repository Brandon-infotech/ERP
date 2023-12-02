import chatModel from "../../models/Chats/chatModel.js";
import userModal from "../../models/users/UserSchema.js";

export const newChat = async (req, res) => {
  try {
    const existingChat = await chatModel.findOne({
      users: { $all: [req.body.users[0], req.body.users[1]] },
    });
    if (existingChat && req.body.users.length === 2) {
      return res.status(200).json({
        success: false,
        message: "Chat Already Exist",
        existingChat,
      });
    }
    const chat = await new chatModel(req.body).save();
    res.status(200).json({
      success: true,
      message: "Chat Created Successfully",
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getChats = async (req, res) => {
  try {
    const Chat = await chatModel
      .find()
      .populate({ path: "users", select: "name position " })
      .populate({ path: "groupAdmin", select: "name " });
    res.status(200).json({
      success: true,
      message: "Chat List",
      Chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await chatModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Chat Deleted Successfully",
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addParticipant = async (req, res) => {
  // console.log(req.params.id);
  try {
    const chat = await chatModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { users: req.body.users } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({
      success: true,
      message: "Chat Updated Successfully",
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get personal messages
export const getPersonalChat = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await chatModel
      .find({ _id: id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(result);
    // console.log(id);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const Users = await userModal.find();
    res.status(200).json({
      success: true,
      message: "Chat List",
      Users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeParticipants = async (req, res) => {
  const { id } = req.params;
  const { users } = req.body;
  try {
    // Validate if the chat exists
    // const chat = await Chat.findById(id);
    // if (!chat) {
    //   return res.status(404).json({ message: "Chat not found" });
    // }
    // Remove participants from chat
    const chat = await chatModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { users: { $in: req.body.users } } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({
      success: true,
      message: "Chat Updated Successfully",
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
