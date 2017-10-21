import React, { Component } from 'react';

export function Icon(props) {
    let classes = ['icon'];
    if (props.scalable) {
        classes.push('icon--scalable');
    }
    classes.push(...props.classes);
    return <i className={classes.join(' ')}
              title={props.title}></i>
}

/**
 * @param {{type: string}} props 
 */
export function Stat(props) {
    return <Icon scalable={true} classes={[
        `i-stat`,
        `i-stat-${props.type}`
    ]} title={props.title} />;
};

/**
 * @param {{res: number}} props 
 */
export function Res(props) {
    return <Icon scalable={true} classes={[
        `i-res`,
        `i-res-${props.res}`
    ]} title={props.title} />;
};

/**
 * @param {{tribe: number}} props 
 */
export function Tribe(props) {
    return <Icon scalable={true} classes={[
        `i-tribe`,
        `i-tribe-${props.tribe}`
    ]} title={props.title} />;
};

/**
 * @param {{unit: number, tribe: number}} props 
 */
export function Unit(props) {
    return <Icon scalable={true} classes={[
        `i-unit`,
        `i-unit-${props.unit + 1}`,
        `i-unit-tribe-${props.tribe + 1}`,
    ]} title={props.title} />;
};

/**
 * @param {{building: number}} props 
 */
export function Build(props) {
    return <Icon scalable={true} classes={[
        `i-building`,
        `i-building-${props.id}`,
    ]} title={props.title} />;
};