const conversations = new Map();
const lastActivityTimestamps = new Map();
function getConversation(conversationId) {
  return conversations.get(conversationId) || null;
}

function createConversation(conversationId, conversation) {
  if (conversations.has(conversationId)) {
    return false;
  }
  conversations.set(conversationId, conversation);
  lastActivityTimestamps.set(conversationId, Date.now());
  return true;
}

function updateConversation(conversationId, conversation) {
  if (!conversations.has(conversationId)) {
    return false;
  }
  conversations.set(conversationId, conversation);
  lastActivityTimestamps.set(conversationId, Date.now());
  return true;
}

function deleteConversation(conversationId) {
  const result = conversations.delete(conversationId);
  lastActivityTimestamps.delete(conversationId);
  return result;
}

function getAllConversations() {
  return conversations;
}

function getAllLastActivityTimestamps() {
  return lastActivityTimestamps;
}

module.exports = {
  getConversation,
  createConversation,
  updateConversation,
  deleteConversation,
  getAllConversations,
  getAllLastActivityTimestamps
};