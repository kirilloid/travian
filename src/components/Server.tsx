import * as React from 'react';
import store from '../store';
import { VModel } from '../model/types';
import { getServers } from '../model';
import { Lang } from '../lang';
import { server } from './model.redux';

export default class Server extends React.Component<{
    version: string,
    onChange: (evt: VModel) => void,
    lang: Lang,
}> {
    public render() {
        const _ = this.props.lang;
        return (<div>
            <label htmlFor="server">Server:</label>
            <select id="server"
                onChange={event => store.dispatch(server(event.target.value))}
                value={this.props.version}>
                {getServers().map(group =>
                    <optgroup label={_(`terms.servers.${group.title}`)} key={group.title}>
                        {group.servers.map(server =>
                            <option value={server.version} key={server.version}>
                                {_(`terms.servers.${server.title}`)}
                            </option>,
                        )}
                    </optgroup>,
                )}
            </select>
        </div>);
    }
}
