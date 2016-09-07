var fastn = require('./fastn'),
    messageService = require('./messages');

var app = fastn('div',
    require('./header')(),
    require('./messageList')()
);

window.onload = function(){

    app.render();

    document.body.appendChild(app.element);

    // Clear the selected message on click anywhere
    // Capture phase to allow bubbled events to set the selected message
    document.addEventListener('click', function(){
        messageService.selectedMessage(null);
    }, true);
};
