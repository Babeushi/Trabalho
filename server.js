const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/graficos.html');
});

io.on('connection', function (socket) {
    console.log('Alguém se conectou!');

    socket.on('disconnect', function(){
        console.log('Alguém foi embora =(');
    });
});

let emitir = function(){
    
    let num = Math.floor(Math.random() * 10 + 1);
    io.emit('#dado', num);
};

let intervalo = setInterval(emitir, 3000);

http.listen(3000, function (err) {

    if (!err) {
        console.log('Servidor rodando normalmente')
    }
});