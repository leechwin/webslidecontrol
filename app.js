var http = require('http'),
      io = require('socket.io'),
      fs = require('fs'),
      server = http.createServer(function(req, res) {
          var reqFile = req.url;
          console.log('[Server] URL : ' + req.url);

          if (reqFile === '/' || reqFile === '/index.html') {
              fs.readFile(__dirname + '/controller/index.html', function (err, data) { // controller ui of index.html
                  if (err) {
                    res.writeHead(500);
                    return res.end('Error loading index.html');
                  }
                  res.writeHead(200, {'Content-Type': 'text/html'});
                  res.end(data);
                  console.log('[Server] Send index.html');
              });
          } else if(reqFile === '/main.js') {
              fs.readFile(__dirname + '/controller/main.js', function (err, data) {
                  if (err) {
                      res.writeHead(500);
                      return res.end('Error loading main.js');
                  }
                  res.writeHead(200, {'Content-Type': 'application/javascript'});
                  res.end(data);
                  console.log('[Server] Send  main.js');
              });
          } else if (reqFile === '/webslidecontrol.js') {
              fs.readFile(__dirname + '/webslidecontrol.js', function (err, data) {
                  if (err) {
                      res.writeHead(500);
                      return res.end('Error loading main.js');
                  }
                  res.writeHead(200, {'Content-Type': 'application/javascript'});
                  res.end(data);
                  console.log('[Server] Send webslidecontrol.js');
              });
          } else if (reqFile === '/favicon.ico') {
              fs.readFile(__dirname + '/favicon.ico', function (err, data) {
                  if (err) {
                      res.writeHead(500);
                      return res.end('Error loading favicon.ico');
                  }
                  res.writeHead(200, {'Content-Type': 'image/x-icon'});
                  res.end(data);
                  console.log('[Server] Send favicon.ico');
              });
          }
      });
 
server.listen(80, null); // HTTP 서버 생성

var clients;

var socket = io.listen(server);
socket.on('connection', function(client) {
    clients = client;

    console.log('[Server] Created socket');
    client.emit('server', { server: 'Welcome to webslidecontrol' });

    client.on('client', function (data) {
        console.log('[Server] ' + data);
    });

    client.on('pre', function (data) {
        console.log('[Server] Pre ' + data);
        client.broadcast.emit('movePre', data);
    });
    client.on('next', function (data) {
        console.log('[Server] Next ' + data);
        client.broadcast.emit('moveNext', data);
    });
});


// http://howtonode.org/socket-io-auth