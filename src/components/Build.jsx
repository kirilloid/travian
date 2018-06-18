import * as React from 'react';
import { Build as BuildIcon } from './Icon';
import { sortBy } from '../utils';

export default class Buildings extends React.Component {
    render() {
        const { buildings, lang } = this.props;
        const sortedBuildings = sortBy(
            buildings.slice(),
            b => lang(b.nameKey())
        );
        
        return <div>
            {[1,2,3].map(type =>
                <BuildList key={type}
                    lang={lang}
                    buildings={sortedBuildings.filter(b => b.y === type)}/>
            )}
        </div>;
    }
}

const BuildList = ({ buildings, lang }) => <ul>
    {buildings.map(building => <Building key={building.id} lang={lang} building={building}/>)}
</ul>;

const Building = ({ building, lang }) => <li>
    <BuildIcon id={building.id}/>
    {lang(building.nameKey())}
</li>;