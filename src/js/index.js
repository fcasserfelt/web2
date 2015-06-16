
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Menu = require('./components/Menu.jsx');
var Home = require('./components/Home.jsx');
var Spark = require('./components/Spark.jsx');


var DefaultRoute = Router.DefaultRoute;
	var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render () {
    return (
      <div>
      	<Menu />
        <h1>Spark app</h1>
        <RouteHandler/>
      </div>
    )
  }
});


var routes = (
  <Route path="/" handler={App}>
	<NotFoundRoute handler={Home} />
    <DefaultRoute handler={Home}/>
    <Route path="home" handler={Home}/>
	<Route path="spark" handler={Spark}/>
  </Route>
);

Router.run(routes, Router.HashLocation, function (Root) {
	console.log('root change');
	console.log(Root)
  React.render(<Root/>, document.getElementById('main'));
});



//React.render(<App />, document.getElementById('main'));



