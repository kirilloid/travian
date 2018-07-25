import * as React from 'react';

import { ButtonEl } from './types'; 

export default class RadioGroup<K> extends React.Component<{
    buttons: ButtonEl<K>[]
    value: K
    onChange: (value: K) => void
}> {
    render() {
        return <div className="button-group">{
            this.props.buttons.map(({ content, title, value }) => 
                <button value={String(value)}
                        key={String(value)}
                        title={title || ""}
                        className={value === this.props.value ? 'active' : ''}
                        onClick={() => this.props.onChange(value)}>
                    {content}
                </button>
            )
        }</div>;
    }
}