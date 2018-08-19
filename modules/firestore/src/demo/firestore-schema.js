// For use with generate-firestore-data
const keyReducers = {};

const schema = {
  // "{env}": {
  user_conversations: {
    "{conversationID}": {
      user_id: "{userID}",
      peer_id: "{peerID}",
      conversation_id: "{conversationID}",
      created_at: "timestamp",
      updated_at: "timestamp",
      unread_message_count: "number"
    }
  },
  messages: {
    "{messageID}": {
      conversation_id: "{conversationID}",
      sender_id: "{userID}",
      recipient_id: "{peerID}",
      created_at: "timestamp",
      updated_at: "timestamp"
    }
  }
};

const count = 20;
module.exports = {
  schema,
  keyReducers,
  count
};
