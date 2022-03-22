const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { NAME, PORT } = require('./config.js');
const PhoneBook = require('./application/modules/phoneBook.js');
const Users = require('./application/modules/users.js');
const Router = require('./application/router/router.js');

const phoneBook = new PhoneBook();
const users = new Users();
const router = new Router({ phoneBook, users });

io.on('connection', socket => {
    console.log('connected ', socket.id);
    socket.on('disconnect', () => console.log('disconnect', socket.id));
    socket.on('sendMessage', data => {
        io.emit('newChatMessage', data);
    });
});

app.use('/', router);
app.use(express.static('public'));

server.listen(PORT, () => console.log('все ок, работаем', NAME));