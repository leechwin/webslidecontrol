var user = '';
var socket;

//Initialize function
var init = function () {
    var port = (location.port || location.host.split(':')[1] );
    if ( !port || port.length == 0 ) {
        portStr = '';
    } else {
        portStr = ':' + port;
    }
    var url = 'http://' + ( location.host || 'localhost' ).split( ':' )[0] + portStr;
    socket = io.connect(url);

    socket.on('connect', function (data) {
        $('#state').attr('class', 'label label-success').html('connected');
    });

    socket.on('disconnect', function (data) {
        socket.socket.reconnect();
        $('#state').attr('class', 'label label-important').html('disconnect');
    });

    socket.on('server', function (data) {
        console.log("[Controller] " + data);
        //socket.emit('client', 'Controller connection success');
        $('.label-success').html('connedted');
    });
};
$(document).ready(init);


function login() {
    user = $('#email').val();
    if (user !== '') {
        console.log("[Controller] login: " + user);
        $('#emailstate').attr('class', 'label label-success').html('logined');
    }
    // FIXME:: added get slide information
}

function start() {
    socket.emit('start', user);
    console.log("[Controller] start", user);
}

function end() {
    socket.emit('end', user);
    console.log("[Controller] end"), user;
}

function pre() {
	socket.emit('pre', user);
    console.log("[Controller] pre", user);
}

function next() {
	socket.emit('next', user);
    console.log("[Controller] next", user);
}
