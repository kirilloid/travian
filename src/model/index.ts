import { VersionInfo, ServerGroup, Model } from './types';

import t5 from './t5/index';
import t5dry from './t5.dry/index';
import t4 from './t4/index';
import t4fin from './t4.fin/index';
import t4fs from './t4.fs/index';
import t36 from './t3.6/index';
import t25 from './t2.5/index';

const model: { [version: string]: Model } = {
    '5': t5,
    '5.dry': t5dry,
    '4': t4,
    '4.fin': t4fin,
    '4.fs': t4fs,
    '3.6': t36,
    '2.5': t25
};

export function getModel(version: string): Model {
    return model[version.replace(/^t/, '')];
};

export function parseVersion(version: string): VersionInfo {
    const [,
        fullVersion = '#',
        base = '#',
        variation = '',
        speed = '1'
    ] = version.match(/^t((\d+)(?:\.(\w+))?)(?:-x(\d+))?$/) || [];

    return {
        original: version,
        full: fullVersion,
        base: base,
        variation: variation || '',
        speed: +speed || 1,
    };
}

export function getServers(): ServerGroup[] {
    return [{
        title: 'kingdoms',
        servers: [{
            title: 'regular',
            version: 't5'
        }, {
            title: 'speed',
            version: 't5-x3'
        }, {
            title: 'dry',
            version: 't5.dry'
        }]
    }, {
        title: 'legends',
        servers: [{
            title: 'regular',
            version: 't4'
        }, {
            title: 'speed',
            version: 't4-x3'
        }],
    }, {
        title: 'ae',
        servers: [{
            title: 'finals',
            version: 't4.fin'
        }, {
            title: 'fs',
            version: 't4.fs'
        }],
    }, {
        title: 'classic',
        servers: [{
            title: 'T3_6',
            version: 't3.6'
        }, {
            title: 'T2_5',
            version: 't2.5'
        }],
    }];
}

function extractDomain(url: string): string | null {
    const m = url.match(/https?:\/\/([\w-.]+)/);
    return m && m[1];
}

function detectServerVersion(url: string): string | null {
    const domain = extractDomain(url);
    if (!domain) return null;
    var m;
    if (m = domain.match(/\[a-z]+\d+(?:x(\d+))?[.]kingdoms[.]com/)) {
        return 't5-x' + m[1];
    }
    if (/kingdoms\.com$/.test(domain)) return 't5';
    if (/tx2[.]travian[.]\w+/.test(domain)) return 't4.fin';
    if (/tx3[.]travian[.]\w+/.test(domain)) return 't4-x3';
    if ('ts8.travian.com' === domain) return 't4.fs';
    if (/ts\d+[.]travian[.]\w+/.test(domain)) return 't4';
    return null;
}

function detectVersion(url: string): string {
    const fromServer = detectServerVersion(url);
    
    if (fromServer === null) {
        return localStorage.getItem('version') || 't4.fs';
    }
    try {
        localStorage.setItem('version', fromServer);
    } finally {
        return fromServer;
    }
}

export function getInitialModel(url: string): Model & { version: VersionInfo } {
    var versionString = detectVersion(url);
    var version = parseVersion(versionString);
    return {
        version,
        ...getModel(version.full)
    };
}