import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    file: {
      type: Object,
    },
    status: {
      type: String,
      enum: ["recieved", "sent", "deleted"],
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "video"],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },

  {
    timestamps: true,
  }
);
export default mongoose.model("Message", messageSchema);
