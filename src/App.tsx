import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Menu 	from './components/Menu';
import Server 	from './components/Server';

import Conq 	from './components/Conq';
import Troops 	from './components/Troops';
import Build 	from './components/Build';
import Def 		from './components/Def';

const menuData = require('./data/menu.json');

import { Model, VersionInfo } from './model/types';

import lang, { Lang } from './lang';
import { getInitialModel } from './model';

type VModel = Model & { version: VersionInfo };

export default class App extends React.Component<
	{  },
	{ lang: Lang, route?: string, model: VModel }
> {
	constructor(props: {}) {
		super(props);
		this.state = {
			lang,
			model: getInitialModel(document.referrer)
		};
	}
	setModel(model: VModel) {
		this.setState({
			lang: this.state.lang,
			model: model,
		});
	}
	setLang(lang: Lang) {
		this.setState({
			lang: lang,
			model: this.state.model,
		});
	}
	render() {
		const { model, lang } = this.state;
		return (
			<div className={'t' + model.version.base}>
				<Router basename={this.state.route}>
					<div>
						<Menu items={menuData} />
						<Server lang={lang}
							version={model.version.original}
							onChange={model => this.setModel(model)}/>
						<Route path="/troops" render={() => <Troops units={model.units} lang={lang} />} />
						<Route path="/conq" render={() => <Conq model={model} lang={lang} />} />
						<Route path="/build" render={() => <Build buildings={model.buildings} lang={lang} />} />
						<Route path="/def" component={() => <Def buildings={model.buildings} lang={lang} />} />
					</div>
				</Router>
			</div>
		);
	}
}