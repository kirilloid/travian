import React, { Component } from 'react';

export default class Troops extends Component {
    render() {
        return (<table>
            <tr><td>name</td><td>off</td><td>cost</td></tr>
            <tr><td>Legionnaire</td><td>50</td><td>400</td></tr>
            <tr><td>Imperian</td><td>70</td><td>600</td></tr>
        </table>);
    }
}