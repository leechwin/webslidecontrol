var socket;

//Initialize function
var init = function () {
    socket = io.connect('http://172.21.111.44:80');

    socket.on('connect', function (data) {
        $('#state').attr('class', 'label label-success').html('connedted');
    });

    socket.on('disconnect', function (data) {
        socket.socket.reconnect();
        $('#state').attr('class', 'label label-important').html('disconnect');
    });

    socket.on('server', function (data) {
        console.log("[Controller] " + data);
        socket.emit('client', 'Controller connection success');
        $('.label-success').html('connedted');
    });
};
$(document).ready(init);

function pre() {
	socket.emit('pre', { pre: 'button' });
}

function next() {
	socket.emit('next', { next: 'button' });
}

