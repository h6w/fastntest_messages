var fastn = require('./fastn'),
    debounce = require('debounce'),
    messagesService = require('./messages');
    searchModel = {
        messageSearch: '',
        result: null
    },
    messageSearch = fastn.binding('messageSearch').attach(searchModel)
        .on('change', debounce(function(search){
            var messages = messagesService.messages();

            if(!search){
                fastn.Model.set(searchModel, 'result', null);
                return;
            }
            fastn.Model.set(searchModel, 'result', messages.filter(function(message){
                if(!message || !message.text || !message.start || !message.duration){
                    return;
                }
                return ~message.text.toLowerCase().indexOf(search.toLowerCase())
                    || ~message.start.toLowerCase().indexOf(search.toLowerCase())
                    || ~message.duration.toLowerCase().indexOf(search.toLowerCase())
                ;
            }));
        }));

module.exports = {
    searchModel: searchModel,
    messageSearch: messageSearch,
    result: fastn.binding('result').attach(searchModel)
};
