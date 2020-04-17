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
      time: new Date(),
    });

    socket.broadcast.to(user.room).emit('message', {
      user: 'system',
      msg: `${user.name} has joined! 👏`,
      time: new Date(),
    });

    io.to(user.room).emit('room-detail', {
        room: user.room,
        users: getCurrentUsersInMatchingRoom(user.room),
      });

    cb();
  });

  socket.on('send-message', (message) => {
    const user = getUser(socket.id);

    if (user && user.room) {
      io.to(user.room).emit('message', {
        user: user.name,
        msg: message,
        time: new Date(),
      });
    } else {
      console.log('An error has occurred with sending message.');
    }
  });

  socket.on('image-upload', (image) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('image', image);
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', {
        user: 'system',
        msg: `${user.name} has left the room.`,
        time: new Date(),
      });

      io.to(user.room).emit('room-detail', {
        room: user.room, users: getCurrentUsersInMatchingRoom(user.room)});
    }
  })
});



io.listen(PORT, () => console.log(`RT Chat Server is running on: ${PORT}.`));