var fastn = require('./fastn'),
    messagesService = require('./messages');

module.exports = function(){
    return fastn('list',
        {
            class: 'messages',
            items: messagesService.messages,
            template: function(model, scope){
                return require('./message.js')().binding('item');
            }
        },
        fastn('button', {class: 'add'}, '+')
        .on('click', function(event, scope){
            require('./newMessage')();
        })
    );
};
