import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Icon } from './Icon';

function MenuIcon({ icon }: { icon: string }) {
    return <Icon classes={['i-menu', 'i-menu-' + icon]} />;
}

type MenuItemProp = { icon: string, text: string, path: string };
function MenuItem({ icon, text, path }: MenuItemProp) {
    return (<NavLink to={'/' + path} activeClassName="selected">
        <MenuIcon icon={icon} />
        <span>{text}</span>
    </NavLink>);
}

export default function Menu(props: { items: MenuItemProp[] }) {
    return (<nav>{
        props.items.map((arg: MenuItemProp) =>
            <MenuItem {...arg} key={arg.path} />)
    }</nav>);
}
