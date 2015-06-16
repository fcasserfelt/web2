'use strict';

var React = require('react');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ListStore = require('../stores/ListStore');


var Spark = React.createClass({

	createNewItem: function( evt ) {
		console.log('create new item spark');
    AppDispatcher.dispatch({
        eventName: 'new-item',
        newItem: { name: 'Marco' } // example data
    });
},

render :function () {
	 return (
      <div>
        <h3>Spark</h3>
        <button onClick={ this.createNewItem }>New Item</button>  
      </div>
    )
  }
});

module.exports = Spark;