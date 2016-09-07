var fastn = require('./fastn'),
    messagesService = require('./messages');

module.exports = function(){

    var newMessageDialog = fastn('div', {class:'newMessage dialog'},
        fastn('form', {class: 'modal'},

            fastn('h3', 'Add a  message'),

            fastn('field',
                fastn('label', { for: 'text' }, 'Text'),
                fastn('input', {
                    id: 'text',
                    value: fastn.binding('text'),
                    onchange: 'value:value'
                })
            ),

            fastn('field',
                fastn('label', { for: 'start' }, 'Start Time'),
                fastn('input', {
                    id: 'start',
                    type: 'datetime-local',
                    value: fastn.binding('start'),
                    onchange: 'value:value'
                })
            ),

            fastn('field',
                fastn('label', { for: 'duration' }, 'Duration'),
                fastn('list:select', {
                      id: 'duration',
                      value: '00:00:05:00',
                      onchange: 'value:value',
                      items: [ 
                        { value: '00:00:05:00', name: '5 minutes' },
                        { value: '00:01:00:00', name: '1 hour' },
                        { value: '00:04:00:00', name: '4 hours' },
                        { value: '01:00:00:00', name: '1 day' },
                        { value: '07:00:00:00', name: '1 week' }
                      ],
                      template: function() {
                        return fastn('option', { value: fastn.binding('item.value') }, fastn.binding('item.name') )
                      }
                    }
                )
            ),

            fastn('field',
                fastn('label', { for: 'repeat' }, 'Repeat'),
                fastn('input', {
                    id: 'repeat',
                    type: 'checkbox',
                    value: fastn.binding('repeat'),
                    onchange: 'value:value'
                }),
                fastn('span', {
                    class: fastn.binding('repeat', function (repeat) {
                        var classes = [];

                        if (repeat == undefined || repeat.checked == false) {
                            classes.push('hidden');
                        }
                        return classes;
                    })},
                    fastn('list:select', {
                          id: 'frequency',
                          value: 'weekly',
                          onchange: 'value:value',
                          items: [ 
                            { value: 'year',      name: 'yearly' },
                            { value: 'month',     name: 'monthly' },
                            { value: 'fortnight', name: 'fortnightly' },
                            { value: 'week',      name: 'weekly' },
                            { value: 'day',       name: 'daily' },
                            { value: 'hour',      name: 'hourly' }
                          ],
                          template: function() {
                            return fastn('option', { value: fastn.binding('item.value') }, fastn.binding('item.name') )
                          }
                        }
                    ),
                    ' until ',
                    fastn('input', {
                        id: 'until',
                        type: 'datetime-local',
                        value: fastn.binding('until'),
                        onchange: 'value:value'
                    })
                )
            ),

            fastn('button', 'Add')
        )
        .on('submit', function(event, scope){
            event.preventDefault();

            messagesService.addMessage(scope.get('.'));

            closeModal();
        })
    )
    .on('click', function(event){
        if(event.target === this.element){
            closeModal();
        }
    });

    function closeModal(){
        newMessageDialog.element.classList.add('closed');

        setTimeout(function(){
            document.body.removeChild(newMessageDialog.element);
            newMessageDialog.destroy();
        },300);
    }

    var randomImageId = Math.floor(Math.random() * 100);

    newMessageDialog.attach({
        'text':null,
        'start':null,
        'duration':null
    });

    newMessageDialog.render();

    document.body.appendChild(newMessageDialog.element);
};
