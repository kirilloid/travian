import * as React from 'react';
import { Build as BuildIcon } from './Icon';
import { sortBy } from '../utils';
import { Building } from '../model/base/buildings'
import { Lang } from '../lang';

export default class Buildings extends React.Component<
    { buildings: Building[], lang: Lang }
> {
    render() {
        const { buildings, lang } = this.props;
        const sortedBuildings = sortBy(
            buildings.slice(),
            b => lang(b.nameKey())
        );
        
        return <div>
            {[1, 2, 3].map(type =>
                <BuildList key={type}
                    lang={lang}
                    buildings={sortedBuildings.filter(b => b.y === type)}/>
            )}
        </div>;
    }
}

const BuildList = (props: { buildings: Building[], lang: Lang }) => <ul>
    {props.buildings.map(building => <Building key={building.id} lang={props.lang} building={building}/>)}
</ul>;

const Building = (props: { building: Building, lang: Lang }) => <li>
    <BuildIcon id={props.building.id}/>
    {props.lang(props.building.nameKey())}
</li>;