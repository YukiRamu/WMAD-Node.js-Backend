const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //find if the same user is in the same room
  const existingUser = users.find(user => user.room === room && user.username === username);

  if (existingUser) {
    //if the user is already logged in
    return { error: "Username is taken" };
  }

  const user = { id, username, room };
  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    //remove user
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find(user => user.id === id);

const getUsersInRoom = (room) => {
  users.filter(user => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };