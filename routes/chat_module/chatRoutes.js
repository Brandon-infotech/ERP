import express from 'express';
import { deleteChat, getChats, newChat, updateChat } from '../../controllers/chat_module/chatController.js';

const router= express.Router();

router.get('/all',getChats)
router.put('/:id',updateChat)
router.post('/new',newChat)
router.delete('/:id',deleteChat);



export default router;