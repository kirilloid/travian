import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu 	from './components/Menu';

import Conq 	from './components/Conq';
import Troops 	from './components/Troops';
import Server 	from './components/Server';

const menuData = require('./data/menu.json');

export default class App extends Component {
	handleRoute(e) {
		console.info("Route entered: %s", e.url);
		//this.currentUrl = e.url;
	};

	render() {
		return (
			<div>
				<Router basename="/travian2">
					<div>
						<Menu items={menuData} />
						<Route path="/" exact component={Server} />
						<Route path="/troops" component={Troops} />
						<Route path="/conq" component={Conq} />
					</div>
				</Router>
			</div>
		);
	}
}