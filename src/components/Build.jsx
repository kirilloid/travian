import React, { Component } from 'react';
import { Build as BuildIcon } from './Icon';
import { sortBy } from '../utils';

export default ({ model, lang }) => class extends Component {
    render() {
        let buildings = sortBy(
            model.buildings.slice(),
            b => lang(b.nameKey())
        );
        
        return <div>
            {[1,2,3].map(type =>
                <BuildList key={type}
                    lang={lang}
                    buildings={buildings.filter(b => b.y === type)}/>
            )}
        </div>;
    }
}

const BuildList = ({ buildings, lang }) => <ul>
    {buildings.map(building => <Building lang={lang} building={building}/>)}
</ul>;

const Building = ({ building, lang }) => <li>
    <BuildIcon id={building.id}/>
    {lang(building.nameKey())}
</li>;