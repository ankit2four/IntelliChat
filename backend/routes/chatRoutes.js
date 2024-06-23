const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getChatHistory, addMessage, deleteChat, deleteChatById, getUserById} = require('../controllers/chatController');

router.get('/history', auth, getChatHistory);
router.post('/addMessage', auth, addMessage);
//router.get('/:userId', auth, chatController.getAllChats);
router.delete('/deleteALL', auth, deleteChat);
router.delete('/:chatId', auth, deleteChatById);


  


module.exports = router;
