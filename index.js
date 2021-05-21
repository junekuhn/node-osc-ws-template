const app = require('express')();
const http = require('http').createServer(app);
const WebSocket = require('ws');
const osc = require('node-osc');

const wss = new WebSocket.Server({ server: http });

const oscServer = new osc.Server(3333, 'localhost', () => {
   console.log('osc server listening');
});



wss.on('connection', function connection(ws) {
   console.log("new client")
   ws.on('message', function incoming(message) {
      console.log('received: %s', message);
   });
   oscServer.on('message', function (msg) {
      console.log(`Message: ${msg}`);
      ws.send(`Message: ${msg}`);
   })
   ws.send('something');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(8000, function() {
  console.log('Listening on *:8000');
});