import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Menu 	from './components/Menu';
import Server 	from './components/Server';

import Conq 	from './components/Conq';
import Troops 	from './components/Troops';
import Build 	from './components/Build';

const menuData = require('./data/menu.json');

import lang from './lang';
import { getInitialModel } from './model';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			lang,
			model: getInitialModel(document.referrer)
		};
	}
	setModel(model) {
		this.setState({
			lang: this.state.lang,
			model: model,
		});
	}
	setLang(lang) {
		this.setState({
			lang: lang,
			model: this.state.model,
		});		
	}
	render() {
		return (
			<div className={'t' + this.state.model.version.base}>
				<Router base={this.state.route}>
					<div>
						<Menu items={menuData} />
						<Server lang={this.state.lang}
							version={this.state.model.version.original}
							onChange={model => this.setModel(model)}/>
						<Route path="/troops" component={Troops(this.state)} />
						<Route path="/conq" component={Conq(this.state)} />
						<Route path="/build" component={Build(this.state)} />
					</div>
				</Router>
			</div>
		);
	}
}