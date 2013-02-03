var socket;

//Initialize function
var init = function () {
    socket = io.connect('http://172.21.111.44:80');

    socket.on('server', function (data) {
        console.log("[Controller] " + data);
        socket.emit('client', 'Controller connection success');
    });

};
$(document).ready(init);

function pre() {
	socket.emit('pre', { pre: 'button' });
}

function next() {
	socket.emit('next', { next: 'button' });
}

