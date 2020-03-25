const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const router = require('./routes/router');

const { addUser, removeUser, getUser, getCurrentUsersInMatchingRoom } = require('./models/users');

const PORT = process.env.port || 3500;

app.use(router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) {
      return cb(error);
    }

    socket.join(user.room);

    socket.emit('message', {
      user: 'system',
      msg: `Let's welcome ${user.name} to the room ${user.room}. ✨✨`,
    });

    socket.broadcast.to(user.room).emit('message', {
      user: 'system',
      msg: `${user.name} has joined! 👏`,
    });

    io.to(user.room).emit('room-detail', {
        room: user.room,
        users: getCurrentUsersInMatchingRoom(user.room),
      });

    cb();
  });

  socket.on('send-message', (message, cb) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {
      user: user.name,
      msg: message,
    });

    cb();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', {
        user: 'system',
        msg: `${user.name} has left the room.`
      });

      io.to(user.room).emit('room-detail', {
        room: user.room, users: getCurrentUsersInMatchingRoom(user.room)});
    }
  })
});



io.listen(PORT, () => console.log(`RT Chat Server is running on: ${PORT}.`));