import React, { Component } from 'react';

export default class extends Component {
    render() {
        return <div className="button-group">{
            this.props.buttons.map(({ content, value, title }) => 
                <button value={value}
                        key={value}
                        title={title || ""}
                        className={value === this.props.value ? 'active' : ''}
                        onClick={event => this.props.onChange(event.currentTarget.value)}>
                    {content}
                </button>
            )
        }</div>;
    }
}