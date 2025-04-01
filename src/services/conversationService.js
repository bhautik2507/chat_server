const sharedStore = require('../utils/sharedMemory');
const { v4: uuidv4 } = require('uuid');

function createConversation() {
  const conversationId = uuidv4();
    const conversation = {
    id: conversationId,
    messages: [],
    createdAt: Date.now()
  };
  sharedStore.createConversation(conversationId, conversation);
  return conversationId;
}

function addMessage(conversationId, messageData) {
  const conversation = sharedStore.getConversation(conversationId);
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  if (!messageData.sender || !['customer', 'agent'].includes(messageData.sender)) {
    throw new Error('Invalid sender. Must be "customer" or "agent"');
  }
  if (!messageData.content || typeof messageData.content !== 'string') {
    throw new Error('Message content is required and must be a string');
  }
  
  const message = {
    id: uuidv4(),
    sender: messageData.sender,
    content: messageData.content,
    timestamp: messageData.timestamp || Date.now()
  };
  
  conversation.messages.push(message);
  sharedStore.updateConversation(conversationId, conversation);
  return message;
}

function getConversationHistory(conversationId) {
  const conversation = sharedStore.getConversation(conversationId);
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  conversation.messages.sort((a, b) => a.timestamp - b.timestamp);
  return conversation;
}

function deleteMessage(conversationId, messageId) {
  const conversation = sharedStore.getConversation(conversationId);
  if (!conversation) {
    throw new Error('Conversation not found');
  }
  const messageIndex = conversation.messages.findIndex(msg => msg.id === messageId);

  if (messageIndex === -1) {
    throw new Error('Message not found');
  }
  conversation.messages.splice(messageIndex, 1);
  sharedStore.updateConversation(conversationId, conversation);
  const response = {
    success: true,
    messageId: messageId
  }
  return response;
}

module.exports = {
  createConversation,
  addMessage,
  getConversationHistory,
  deleteMessage
};