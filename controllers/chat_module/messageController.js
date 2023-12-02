import chatModel from "../../models/Chats/chatModel.js";
import messageModel from "../../models/Chats/messageModel.js";
import userModel from "../../models/users/UserSchema.js";
import { resolve } from "path";
import * as fs from "fs";
export const newMessage = async (req, res) => {
  try {
    const { sender, content, status, messageType, chat } = req.body;
    const file = req.file;
    const newMessage = {
      sender: sender,
      content: content,
      file: file,
      status: status,
      messageType: messageType,
      chat: chat,
    };

    const messages = await messageModel.create(newMessage);
    await userModel.populate(messages, { path: "sender", select: "name" });
    await chatModel.populate(messages, {
      path: "chat",
      select: "users",
      populate: [{ path: "users", model: "User", select: "-password" }],
    });

    res.status(200).json({
      success: true,
      message: "success",
      messages,
    });
  } catch (error) {
    res.status(error).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const id = req.params.id;
    const messages = await messageModel
      .find({ chat: id })
      .populate({ path: "sender", select: "name profilePhoto" });

    res.status(200).json({
      success: true,
      message: "success",
      messages,
    });
  } catch (error) {
    res.status(error).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const id = req.body.id;
    const messages = await messageModel.findByIdAndDelete(id);
    // console.log(messages);
    res.status(200).json({
      success: true,
      message: "success",
      messages,
    });
  } catch (error) {
    console.log(error);
    res.status(error).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const messages = await messageModel.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "success",
      messages,
    });
  } catch (error) {
    res.status(error).json({
      success: false,
      message: error.message,
    });
  }
};

export const downloadAttachment = async (req, res) => {
  //get the attachment path
  const filename = req.body.path;
  const absolutePath = resolve(`${filename}`);
  //use that path to send it to frontend using res.download()
  const file = absolutePath;
  res.download(file);
};

export const pinMessage = async (req, res) => {
  try {
    const messages = await messageModel.findByIdAndUpdate(
      req.params.id,
      {
        isPinned: req.body.isPinned,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "success",
      messages,
    });
  } catch (error) {
    res.status(error).json({
      success: false,
      message: error.message,
    });
  }
};

export const getVideo = async (req, res) => {
  try {
    const filePath = `uploads/${req.params.path}`;
    if (!filePath) {
      return res.status(404).send("File not found");
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (error) {
    console.log(error);
  }
};
