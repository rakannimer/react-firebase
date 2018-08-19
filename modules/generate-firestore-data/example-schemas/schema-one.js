const keyReducers = {
  // "{env}": fakerjs => {
  //   return fakerjs.random.arrayElement(["staging"]);
  //   return fakerjs.random.arrayElement(["prod", "staging"]);
  // },
  // "{userID}": fakerjs => {
  //   return fakerjs.random.alphaNumeric(5);
  // },
  // "{postID}": fakerjs => {
  //   return fakerjs.random.alphaNumeric(5);
  // }
};

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
      peer_id: "{peerID}",
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
