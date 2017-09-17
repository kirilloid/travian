import React, { Component } from 'react';

export default class Server extends Component {
    render() {
        return (<table>
            <tbody>
                <tr><th colSpan="2">Kingdoms</th></tr>
                <tr><td>1x</td><td>3x</td></tr>
                <tr><th colSpan="2">Legends</th></tr>
                <tr><td>1x</td><td>3x</td></tr>
            </tbody>
        </table>);
    }
}