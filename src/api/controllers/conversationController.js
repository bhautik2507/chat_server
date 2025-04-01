
const conversationService = require('../../../src/services/conversationService');

function createConversation(req, res, next) {
  try {
    const conversationId = conversationService.createConversation();
    console.log("BLACK ===========>>>>>>>>> ~ :7 ~ createConversation ~ conversationId:", conversationId)
    res.status(201).json({ conversationId });
  } catch (error) {
    next(error);
  }
}

function addMessage(req, res, next) {
  try {
    const { conversationId } = req.params;
    const messageData = req.body;
    console.log("BLACK ===========>>>>>>>>> ~ :18 ~ addMessage ~ messageData:", messageData)
    const message = conversationService.addMessage(conversationId, messageData);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
}

function getConversationHistory(req, res, next) {
  try {
    const { conversationId } = req.params;
    console.log("BLACK ===========>>>>>>>>> ~ :30 ~ getConversationHistory ~ conversationId:", conversationId)
    const conversation = conversationService.getConversationHistory(conversationId);
    res.status(200).json(conversation);
  } catch (error) {
    next(error);
  }
}

function deleteMessage(req, res, next) {
  try {
    const { conversationId, messageId } = req.params;
    console.log("BLACK ===========>>>>>>>>> ~ :65 ~ deleteMessage ~ conversationId:", conversationId)
    const response = conversationService.deleteMessage(conversationId, messageId);
    res.send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createConversation,
  addMessage,
  getConversationHistory,
  deleteMessage
};