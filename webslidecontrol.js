var socket;

//Initialize function
var init = function () {
    socket = io.connect('http://172.21.111.44:80');

    socket.on('server', function (data) {
        console.log("[Slide] " + data);
        socket.emit('client', 'WebSlide connection success');
    });

    socket.on('movePre', function (data) {
        console.log("[Slide] " + data);
        pre();
    });

    socket.on('moveNext', function (data) {
        console.log("[Slide] " + data);
        next();
    });
};
$(document).ready(init);

function pre() {
    Reveal.navigatePrev();
}

function next() {
    Reveal.navigateNext();
}

///////////////////////////
// TODO::
var e = null;

function simulateKeyPress(character) {
    /*
    var e = $.Event("keydown");
e.which = 39; // # Some key code value
$('body').trigger(e);

console.log(e);
*/

//  jQuery.event.trigger({ type : 'keypress', which : 39 });
}

//socket.disconnect(); // 연결 종료


