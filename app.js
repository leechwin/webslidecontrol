var express = require('express'), // web framework
      connect = require( 'connect' ), // Server
      http = require('http'), // Web Server
      io = require('socket.io'), // Socket.io
      fs = require('fs'),
      path = require('path'); // Path

var app = express();

app.configure( function(){
  app.set( 'port', process.env.PORT || 3000 );
  app.use( connect.compress() );
  app.use( express.favicon() );
  app.use( express.logger('dev') );
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( __dirname, 'public' ) ) );
});

app.get( '/webslidecontrol.js', function( req, res) {
  res.writeHead(200, {'Content-Type': 'application/javascript'});

  var socketStraem = fs.createReadStream( './node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js');
  socketStraem.on('data', function(data) {
    console.log("socket.io : ");
    res.write(data);
  });

  socketStraem.on('close', function() {
    var webslideStraem = fs.createReadStream( './webslidecontrol.js');
    webslideStraem.on('data', function(data) {
      console.log("webslide : ");
      res.write(data);
    });

    webslideStraem.on('close', function() {
      res.end();

    });
  });
});

// Start server
io = io.listen( http.createServer( app ).listen( app.get('port'), function() {
  console.log( "Express server listening on port " + app.get( 'port' ) );
} ) );

// Start socket.io
io.sockets.on( 'connection', function( socket ) {

  socket.on( 'message', function( data ) {
    console.log('[Server] ' + data);
  });

  socket.on( 'disconnect', function() {
    console.log('[Server] disconnect');
  });

  socket.on('pre', function (data) {
      console.log('[Server] pre ' + data);
      socket.broadcast.emit('pre');
  });

  socket.on('next', function (data) {
      console.log('[Server] next ' + data);
      socket.broadcast.emit('next');
  });

});

/*
var server = http.createServer(function(req, res) {
    var reqFile = req.url;
    console.log('[Server] URL : ' + req.url);

    if (reqFile === '/' || reqFile === '/index.html') {
        fs.readFile(__dirname + '/public/index.html', function (err, data) { // controller ui of index.html
            if (err) {
              res.writeHead(500);
              return res.end('Error loading index.html');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
            console.log('[Server] Send index.html');
        });
    } else if(reqFile === '/css/style.css') {
        fs.readFile(__dirname + '/public/css/style.css', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading style.css');
            }
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
            console.log('[Server] Send  style.css');
        });
    } else if(reqFile === '/js/jquery-1.7.1.min.js') {
        fs.readFile(__dirname + '/public/js/jquery-1.7.1.min.js', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading jquery-1.7.1.min.js');
            }
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(data);
            console.log('[Server] Send  jquery-1.7.1.min.js');
        });
    } else if(reqFile === '/css/bootstrap.min.css') {
        fs.readFile(__dirname + '/public/css/bootstrap.min.css', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading bootstrap.min.css');
            }
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
            console.log('[Server] Send  bootstrap.min.css');
        });
    } else if(reqFile === '/css/bootstrap-responsive.min.css') {
        fs.readFile(__dirname + '/public/css/bootstrap-responsive.min.css', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading bootstrap-responsive.min.css');
            }
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
            console.log('[Server] Send  bootstrap-responsive.min.css');
        });
    } else if(reqFile === '/js/main.js') {
        fs.readFile(__dirname + '/public/js/main.js', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading main.js');
            }
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(data);
            console.log('[Server] Send  main.js');
        });
    } else if(reqFile === '/js/bootstrap.min.js') {
        fs.readFile(__dirname + '/public/js/bootstrap.min.js', function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading bootstrap.min.js');
            }
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(data);
            console.log('[Server] Send  bootstrap.min.js');
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
    }
});
 
server.listen(app); // HTTP 서버 생성

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
*/

// http://howtonode.org/socket-io-auth