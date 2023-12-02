import express from "express";
import {
  deleteChat,
  getChats,
  newChat,
  addParticipant,
  getPersonalChat,
  getAllEmployees,
  removeParticipants,
} from "../../controllers/chat_module/chatController.js";

const router = express.Router();

router.get("/all", getChats);
router.get("/users", getAllEmployees);
router.get("/:id", getPersonalChat);
router.post("/add/:id", addParticipant);
router.put("/remove/:id", removeParticipants);
router.post("/new", newChat);
// router.post("add", addParticipant);
router.delete("/delete/:id", deleteChat);

export default router;
