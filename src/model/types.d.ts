export interface VersionInfo {
    original: string
    full: string
    base: string
    variation: string
    speed: number
}

export interface ServerGroup {
    title: string
    servers: Server[]
}

export interface Server {
    title: string
    version: string
}

export interface Model {
    units: any[]
    buildings: any[]
    culture: any
    combat: any
    Hero: any
}
