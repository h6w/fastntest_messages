var cpjax = require('cpjax'),
    fastn = require('./fastn');

function getMessages(callback){
    cpjax({
        url: './messages.json',
        dataType: 'json'
    }, function(error, messages){
        callback(error, messages.map(function(message){
            return message.message;
        }));
    });
};

var messagesModel = new fastn.Model({
    messages: [],
    deletedMessages: []
});

getMessages(function(error, messages){
    if(error){
        return;
    }

    messagesModel.set('messages', messages);
});

function deleteMessage(message){
    messagesModel.push('deletedMessages', message);
}

function addMessage(message){
    messagesModel.insert('messages', message, 0);
}

module.exports = {
    messagesModel: messagesModel,
    messages: fastn.binding('messages|*').attach(messagesModel),
    deletedMessages: fastn.binding('deletedMessages|*').attach(messagesModel),
    selectedMessage: fastn.binding('selected').attach(messagesModel),
    deleteMessage: deleteMessage,
    addMessage: addMessage
};
