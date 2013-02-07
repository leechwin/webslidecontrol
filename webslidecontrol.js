var socket;

//Initialize function
var init = function () {
    socket = io.connect('http://webslidecontrol.herokuapp.com');

    socket.on('start', function (data) {
        console.log("[Slide] start " + data);
        start();
    });

    socket.on('end', function (data) {
        console.log("[Slide] end " + data);
        end();
    });

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


var slidePresentation;

/**
 * presentation starts
 */
function start() {
    if (typeof impress !== 'undefined') {
        impress().goto( 0 );
    } else if (typeof Reveal !== 'undefined') {
        Reveal.slide( 0 );
    } else if (typeof SlideManager !== 'undefined') {
        if (typeof slidePresentation === 'undefined') {
            slidePresentation = new SlideManager();
        }
        slidePresentation.toggleSpeakerNotes();
    }
}

/**
 * presentation ends
 */
function end() {
    if (typeof impress !== 'undefined') {
        impress().goto($('.step').length - 1);
    } else if (typeof Reveal !== 'undefined') {
        Reveal.slide( Number.MAX_VALUE );
    } else if (typeof SlideManager !== 'undefined') {
        if (typeof slidePresentation === 'undefined') {
            slidePresentation = new SlideManager();
        }
        slidePresentation.highlightImportantCode();
    }
}

/**
 * presentation pre
 */
function pre() {
    if (typeof impress !== 'undefined') {
        impress().prev();
    } else if (typeof Reveal !== 'undefined') {
        Reveal.navigatePrev();
    } else if (typeof SlideManager !== 'undefined') {
        if (typeof slidePresentation === 'undefined') {
            slidePresentation = new SlideManager();
        }
        slidePresentation.prev();
    }
}

/**
 * presentation next
 */
function next() {
    if (typeof impress !== 'undefined') {
        impress().next();
    } else if (typeof Reveal !== 'undefined') {
        Reveal.navigateNext();
    } else if (typeof SlideManager !== 'undefined') {
        if (typeof slidePresentation === 'undefined') {
            slidePresentation = new SlideManager();
        }
        slidePresentation.next();
    }
}

/* TODO::
function clickevent(){                
     var e = $.Event("keydown");
     e.which = 38;
     e.keyCode = 38;
     $(document).trigger(e);     
}

$(document).trigger($.Event("keydown", { keyCode: 38 }))

function simulateKeyPress(character) {
    var e = $.Event("keydown");
    e.which = 39; // # Some key code value
    $('body').trigger(e);

    console.log(e);
    //  jQuery.event.trigger({ type : 'keypress', which : 39 });
}
*/
