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
import * as path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    return cb(null, uploadPath);
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
