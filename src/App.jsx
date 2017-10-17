import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Menu 	from './components/Menu';
import Server 	from './components/Server';

import Conq 	from './components/Conq';
import Troops 	from './components/Troops';
import Build 	from './components/Build';
import Def 		from './components/Def';

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
		const { model, lang } = this.state;
		return (
			<div className={'t' + model.version.base}>
				<Router base={this.state.route}>
					<div>
						<Menu items={menuData} />
						<Server lang={lang}
							version={model.version.original}
							onChange={model => this.setModel(model)}/>
						<Route path="/troops" render={() => <Troops units={model.units} lang={lang} />} />
						<Route path="/conq" render={() => <Conq model={model} lang={lang} />} />
						<Route path="/build" component={Build(this.state)} />
						<Route path="/def" component={Def(this.state)} />
					</div>
				</Router>
			</div>
		);
	}
}