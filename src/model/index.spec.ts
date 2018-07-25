import { parseVersion, getModel, getServers } from '.';
import * as tape from 'tape';

tape('parseVersion', t => {
    t.deepEqual(parseVersion('t1.a'), { original: 't1.a', full: '1.a', base: '1', variation: 'a', speed: 1 });
    t.deepEqual(parseVersion('t2.5'), { original: 't2.5', full: '2.5', base: '2', variation: '5', speed: 1 });
    t.deepEqual(parseVersion('t3-x3'), { original: 't3-x3', full: '3', base: '3', variation: '', speed: 3 });
    t.deepEqual(parseVersion('t4.f-x2'), { original: 't4.f-x2', full: '4.f', base: '4', variation: 'f', speed: 2 });
    t.end();
});

tape('existing configuration', t => {
    getServers().forEach(serverGroup =>
        serverGroup.servers.forEach(server => {
            const model = getModel(parseVersion(server.version).full);
            t.ok(model, `${server.version}: model exists`);
            t.ok(model.culture, `${server.version}: model.culture exists`);
            t.ok(model.units, `${server.version}: model.units exists`);
            t.ok(model.buildings, `${server.version}: model.buildings exists`);
        }));
    t.end();
});