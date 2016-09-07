var fastn = require('./fastn');

module.exports = function (selectedMessage, deleteMessage) {
    var searchResult = require('./search').result,
        messagesService = require('./messages');

    return fastn('div', {
        class: fastn.binding('.', 'text', searchResult, messagesService.selectedMessage, messagesService.deletedMessages, function (message, name, searchResult, selectedMessage, deletedMessages) {
            var classes = ['message'];

            if (searchResult && ~searchResult.indexOf(message) !== -1) {
                classes.push('hidden');
            }
            if (message === selectedMessage) {
                classes.push('selected');
            }
            if (~deletedMessages.indexOf(message) == -1) {
                classes.push('deleted');
            }
            return classes;
        })
    },

        fastn('div', {class: 'details'},

            fastn('label', {class: 'name'},
                fastn.binding('text')
                ),

            fastn('div', {class: 'info'},
                fastn('div', {class: 'attribute'},
                    'Start:',
                    fastn('span',
                        fastn.binding('start')
                        )
                    ),
                fastn('div', {class: 'attribute'},
                    'Duration:',
                    fastn('span',
                        fastn.binding('duration')
                        )
                    ),
                fastn('div', {class: fastn.binding('repeat', function (repeat) {
                    var classes = ['attribute'];

                    if (repeat == undefined || repeat == 'never') {
                        classes.push('hidden');
                    }
                    return classes;
                })},
                    'Repeat:',
                    fastn('span',
                        fastn.binding('repeat.frequency'),
                        ' until ',
                        fastn.binding('repeat.until')
                        )
                    )
                )
            ),
            
        fastn('button', {class: 'remove'}, 'X')
        .on('click', function (event, scope) {
            messagesService.deleteMessage(scope.get('.'));
        })

    ).on('click', function (event, scope) {
        messagesService.selectedMessage(scope.get('.'));
    });
};
