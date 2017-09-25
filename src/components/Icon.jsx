import React, { Component } from 'react';

export function Icon(props) {
    let classes = ['icon'];
    if (props.scalable) {
        classes.push('icon--scalable');
    }
    classes.push(...props.classes);
    return <i className={"icon"}></i>
}

/**
 * @param {{unit: number, tribe: number}} props 
 */
export function Unit(props) {
    return <Icon scalable={true} classes={[
        `i-unit`,
        `i-unit-${props.unit}`,
        `i-unit-tribe-${props.tribe}`,
    ]} />;
};