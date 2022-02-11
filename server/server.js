require("dotenv").config();
const express = require("express");
const cors = require("cors");
const utils = require("./utils/utils");
const db = require("./utils/initDb");
const app = express();
var server = require('http').Server(app);
const Users = require("./utils/users");

console.log("Started");
const PORT = process.env.PORT || 8001;
users = new Users();


// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// letsgo
server.listen(PORT, function () {
  console.log(`Server runing without problem - Running on port: ${PORT}`);
  utils.recreateConnection(); // Start session
});


// totaly socket
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

function sendToAll(name, data){
  for(const socket of users.getSockets()){
		socket.emit(name, data);
	}
}


io.on("connection", (socket) => {
  newId = users.add(socket);
  console.log("new user " + newId);


  socket.on('setName', (data) => {
    if(data.name && users.unusedName(data.name)){
      id = users.getIdBySocket(socket);
      users.setName(id, data.name);
      socket.emit('unusedName', undefined);
      utils.getStoredMessages(100, function(result){
        socket.emit('olderMessages', result);
      });

      socket.emit('olderMessages',
        utils.getStoredMessages(100, function(result){return result})
      );
      sendToAll('onlineUsers', users.getOnilne());
    } else {
      socket.emit('usedName', undefined);
    }
  });

  socket.on('message', (data) => {
    utils.storeMessage(data.name, data.text, (id) => {
      sendToAll('newMessage', {id: id, name: data.name, text: data.text});
    });
  });

  socket.on('disconnect', () => {
    users.delete(users.getIdBySocket(socket));
    sendToAll('onlineUsers', users.getOnilne());
  });
});
