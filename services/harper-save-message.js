const harperSaveMessage = (message, username, room) => {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbPw || !dbUrl) return null;

  let data = JSON.stringify({
    operation: 'insert',
    schema: 'realtime_chat_app',
    table: 'messages',
    records: [
      {
        message,
        username,
        room
      }
    ]
  });
}

module.exports = harperSaveMessage;