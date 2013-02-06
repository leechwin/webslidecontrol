var socket;

//Initialize function
var init = function () {
    /*
    var port = (location.port || location.host.split(':')[1] );
    if ( !port || port.length == 0 ) {
        portStr = '';
    } else {
        portStr = ':' + port;
    }
    var url = 'http://' + ( location.host || 'localhost' ).split( ':' )[0] + portStr;
    socket = io.connect(url);
    */

    socket = io.connect('http://slidecontrol.herokuapp.com');

    socket.on('pre', function (data) {
        console.log("[Slide] pre " + data);
        pre();
    });

    socket.on('next', function (data) {
        console.log("[Slide] next " + data);
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

/*
// TODO::
var e = null;

function simulateKeyPress(character) {
 3   var e = $.Event("keydown");
e.which = 39; // # Some key code value
$('body').trigger(e);

console.log(e);

//  jQuery.event.trigger({ type : 'keypress', which : 39 });
}
*/

//socket.disconnect(); // 연결 종료


