var AppDispatcher = require('../dispatcher/AppDispatcher');

	
var ListStore = {

    items: [],

    getAll: function() {
        return this.items;
    },

};

AppDispatcher.register( function( payload ) {

	switch( payload.eventName ) {

        case 'new-item':
        	console.log(payload.newItem);
            ListStore.items.push( payload.newItem );
            console.log(ListStore.getAll)
            break;

    }

    return true;

}); 