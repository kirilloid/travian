import React from 'react';
import { NavLink } from 'react-router-dom';

import { Icon } from './Icon';

function MenuIcon({ icon }) {
    return <Icon classes={['i-menu', 'i-menu-' + icon]} />
}

function MenuItem({ icon, text, path }) {
    return (<NavLink to={path} activeClassName="selected">
        <MenuIcon icon={icon} />
        <span>{text}</span>
    </NavLink>);
}

export default function Menu(props) {
    return (<nav>{
        props.items.map(({icon, text, path}) =>
            <MenuItem key={path} icon={icon} text={text} path={path} />)
    }</nav>)
}
