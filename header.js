var fastn = require('./fastn'),
    messagesModel = require('./messages').messagesModel;

module.exports = function(searchModel){
    return fastn('header', {'class':'mainHeader'},
        fastn('img', {src: 'logo.png'}),
        fastn('span',
            fastn.binding('messages', require('./search').result,  function(messages, results){
                if(!messages){
                    messages = [];
                }

                var total = messages.filter(function(message){
                        return true;
                    }).length;

                var result = '';

                if(results){
                    result += 'Showing ' + results.length +' of ';
                }

                result += total;

                return result;
            }),
            ' messages'
        ).attach(messagesModel),
        require('./searchBar')()
    );
};
