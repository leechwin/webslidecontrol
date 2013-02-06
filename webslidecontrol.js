var socket;

//Initialize function
var init = function () {
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

/* TODO::
function simulateKeyPress(character) {
    var e = $.Event("keydown");
    e.which = 39; // # Some key code value
    $('body').trigger(e);

    console.log(e);
    //  jQuery.event.trigger({ type : 'keypress', which : 39 });
}
*/
