const express = require('express');
const conversationController = require('../controllers/conversationController');
const router = express.Router();

router.post('/conversations', conversationController.createConversation);
router.post('/conversations/:conversationId/messages', conversationController.addMessage);
router.get('/conversations/:conversationId', conversationController.getConversationHistory);
router.delete('/conversations/:conversationId/messages/:messageId', conversationController.deleteMessage);

module.exports = router;