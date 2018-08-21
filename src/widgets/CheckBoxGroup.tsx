import * as React from 'react';

import { ButtonEl } from './types';

export default class CheckBoxGroup<K = 'string' | 'number'> extends React.Component<{
    buttons: ButtonEl<K>[]
    values: K[]
    onChange: (value: K) => void,
}> {
    public render() {
        return <div className="button-group">{
            this.props.buttons.map(({ content, title, value }) =>
                <button value={String(value)}
                        key={String(value)}
                        title={title || ""}
                        className={this.props.values.includes(value) ? 'active' : ''}
                        onClick={() => this.props.onChange(value)}>
                    {content}
                </button>)
        }</div>;
    }
}
