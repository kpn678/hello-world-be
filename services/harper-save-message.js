const harperSaveMessage = (message, username, room) => {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbPw || !dbUrl) return null;
}

module.exports = harperSaveMessage;