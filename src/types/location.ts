interface Geometry {
    coordinates: [ number, number ],
    type: string
}

export interface Place {
    bbox: number[][],
    center: number[],
    geometry: Geometry,
    coords: Coords,
    place_name: string,
    place_type: string[],
    type: string,
    text: string,
    id: string,
}

export interface Position {
    coords: Coordinates
}

export interface Coords {
    latitude: number
    longitude: number
}

export interface SimplePosition {
    coords: Coords,
    bbox: number[][]
}