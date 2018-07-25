import * as React from 'react';

export function Icon(props: { classes: string[], scalable?: boolean, title?: string }) {
    let classes = ['icon'];
    if (props.scalable) {
        classes.push('icon--scalable');
    }
    classes.push(...props.classes);
    return <i className={classes.join(' ')}
              title={props.title}></i>
}

type stat = 'off' | 'off_i' | 'off_c' |  'def' | 'def_i' | 'def_c' | 'off_s' | 'def_s' | 'point' | 'cap' | 'off_p' |  'def_b' | 'off_p' | 'def_p' | 'speed' | 'health';

export function Stat(props: { type: stat, title?: string }) {
    return <Icon scalable={true} classes={[
        `i-stat`,
        `i-stat-${props.type}`
    ]} title={props.title} />;
};

export function Res(props: { res: number, title?: string }) {
    return <Icon scalable={true} classes={[
        `i-res`,
        `i-res-${props.res}`
    ]} title={props.title} />;
};

export function Tribe(props: { tribe: number, title?: string }) {
    return <Icon scalable={true} classes={[
        `i-tribe`,
        `i-tribe-${props.tribe}`
    ]} title={props.title} />;
};

export function Unit(props: { unit: number, tribe: number, title?: string }) {
    return <Icon scalable={true} classes={[
        `i-unit`,
        `i-unit-${props.unit + 1}`,
        `i-unit-tribe-${props.tribe + 1}`,
    ]} title={props.title} />;
};

export function Build(props: { id: number, title?: string }) {
    return <Icon scalable={true} classes={[
        `i-building`,
        `i-building-${props.id}`,
    ]} title={props.title} />;
};