const leaveRoom = (userID, chatroomUsers) => {
  return chatroomUsers.filter(user => user.id !== userID);
}

module.exports = leaveRoom;