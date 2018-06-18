import * as React from 'react';

export default class RadioGroup extends React.Component {
    render() {
        return <div className="button-group">{
            this.props.buttons.map(({ content, title, value }) => 
                <button value={value}
                        key={value}
                        title={title || ""}
                        className={value === this.props.value ? 'active' : ''}
                        onClick={() => this.props.onChange(value)}>
                    {content}
                </button>
            )
        }</div>;
    }
}