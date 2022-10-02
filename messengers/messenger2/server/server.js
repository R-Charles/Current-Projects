const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors"); //allows backend to share resources with our react application
const mongoose = require('mongoose');
const http=require("http")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("./config/mongoose.config");

// require("./server/routes/placeholder.route")(app);

// const io = require('socket.io')(3001)
const io = require('socket.io')(app.listen(8000), {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
    })
})








app.listen( port, () => console.log(`Listening on port: ${port}`) );