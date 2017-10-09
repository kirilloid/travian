import React, { Component } from 'react';

export function Icon(props) {
    let classes = ['icon'];
    if (props.scalable) {
        classes.push('icon--scalable');
    }
    classes.push(...props.classes);
    return <i className={classes.join(' ')}></i>
}

/**
 * @param {{unit: number, tribe: number}} props 
 */
export function Unit(props) {
    return <Icon scalable={true} classes={[
        `i-unit`,
        `i-unit-${props.unit + 1}`,
        `i-unit-tribe-${props.tribe + 1}`,
    ]} />;
};

/**
 * @param {{building: number}} props 
 */
export function Build(props) {
    return <Icon scalable={true} classes={[
        `i-building`,
        `i-building-${props.id}`,
    ]} />;
};