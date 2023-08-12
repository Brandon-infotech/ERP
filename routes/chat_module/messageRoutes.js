import express from 'express';
import { deleteMessage, getMessages, newMessage, updateMessage } from '../../controllers/chat_module/messageController.js';

const router = express.Router();

router.get('/',getMessages)
router.post('/',newMessage)
router.delete('/:id',deleteMessage)
router.put('/:id',updateMessage)

export default router;