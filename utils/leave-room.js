const leaveRoom = (userID, chatroomUsers) => {
  return chatroomUsers.filter(user => user.id !== userID);
}

export default leaveRoom;