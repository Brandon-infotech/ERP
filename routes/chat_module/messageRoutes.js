import express from "express";
import {
  deleteMessage,
  getMessages,
  newMessage,
  updateMessage,
  downloadAttachment,
  pinMessage,
  getVideo,
} from "../../controllers/chat_module/messageController.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const router = express.Router();
const upload = multer({ storage });

router.post("/download/", downloadAttachment);
router.post("/", upload.single("file"), newMessage);
router.post("/delete/", deleteMessage);
router.get("/video/:path", getVideo);
router.get("/:id", getMessages);
router.put("/pin/:id", pinMessage);
router.put("/:id", updateMessage);

export default router;
