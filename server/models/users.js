const users = {};

const getUserDetailsByName = (id, name) => {
  if (Object.keys(users).length) {
    let userResult = Object.values(users).filter((user) => user.name === name);
    return userResult[0];
  }
  return false;
};

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = getUserDetailsByName(id, name) || {};

  if(!name) {
    return { error: 'Username cannot be empty. Please return to home and try again.' };
  }

  if (!room) {
    return { error: 'Room cannot be empty. Please return to home and try again.' };
  }

  if (Object.keys(existingUser).length && existingUser.name) {
    return { error: 'Name already exists. Please return to home and try a new one.'};
  }

  const user = { id, name, room };

  users[id] = user;

  return { user };
};

const removeUser = (id) => {
  const user = users[id];
  delete users[id];

  return user;
};

const getUser = (id) => users[id];

const getCurrentUsersInMatchingRoom = (room) => {
  let allUsers = Object.values(users);
  let matchingUsers = [];
  if (allUsers.length) {
    allUsers.forEach((user) => {
      if (user.room === room) {
        matchingUsers.push(user);
      }
    });
  }

  return matchingUsers;
};

module.exports = { addUser, removeUser, getUser, getCurrentUsersInMatchingRoom };