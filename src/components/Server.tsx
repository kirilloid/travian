import * as React from 'react';
import { getModel, getServers, parseVersion } from '../model';
import { Lang } from '../lang';

export default class Server extends React.Component<{
    version: string,
    onChange: (evt: any) => void,
    lang: Lang,
}> {
    public render() {
        const _ = this.props.lang;
        return (<div>
            <label htmlFor="server">Server:</label>
            <select id="server"
                onChange={event => this.props.onChange(this.mapVersion(event.target.value))}
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
    protected mapVersion(stringVersion: string) {
        const version = parseVersion(stringVersion);
        return {
            version,
            ...getModel(version.full),
        };
    }
}
