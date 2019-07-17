import { subHours, addMinutes, isFuture } from 'date-fns'
import * as mapboxgl from 'mapbox-gl'

import { LAYER_MAPPING } from '../constants/maps'


type Coords = { latitude: number; longitude: number }

const threeHoursAgo = () => subHours(new Date(), 3)

const convertObjectToQuery = (obj : { [key: string]:  string }) => {
    return Object.entries(obj).reduce((acc: string, entry: Array<string>, idx: number) => {
        const [ key, value ] = entry
        const separator = idx === 0 ? '?' : '&'
        return `${acc}${separator}${key}=${value}`
    }, '')
}

const buildWmsUrl = (base: string, layers: string = '1') => {
    const queryParamsObject: { [key: string]:  string } = {
        request: 'GetMap',
        layers,
        format: 'png',
        transparent: 'true',
        crs: 'EPSG:3857',
        version: '1.3.0',
        width: '256',
        height: '256',
        styles: '',
        bbox: '{bbox-epsg-3857}'
    }
    const queryParams = convertObjectToQuery(queryParamsObject)
    return base + queryParams
}

// const getPath = (currentImage: number = 0) => {
//     return "https://docs.mapbox.com/mapbox-gl-js/assets/radar" + currentImage + ".gif";
// }

// const setCoords = (bbox: number[]) => {
//     const [ swLng, swLat, neLng, neLat ] = bbox

//     const lngDiff = neLng - swLng
//     const nwLng = swLng + lngDiff
//     const seLng = neLng - lngDiff

//     const latDiff = neLat - swLat
//     const nwLat = neLat - latDiff
//     const seLat = swLat + latDiff

//     return [
//         [ swLng, swLat ],
//         [ nwLng, nwLat ],
//         [ neLng, neLat ],
//         [ seLng, seLat ],
//     ]

// }

export default class MapManager {
    map: mapboxgl.Map
    currentLayer: string
    currentInterval: Date
    animationId: number | null
    frameRate: number
    coords: Coords

    constructor(coords: Coords, bbox: number[], id: string) {
        this.coords = coords
        this.map = this.createMap(coords, id)
        this.map.scrollZoom.disable()
        this.addControls()
        this.addLayers()
        this.currentInterval = threeHoursAgo()
        this.animationId = null
        this.frameRate = 0.5
        this.currentLayer = ''
    }

    createMap = ({ latitude, longitude }: Coords, id: string) => {
        (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiY3FsYW51cyIsImEiOiJjanh5czV1ZWYwZG5pM25wZWtiYzV3emtlIn0.qNuQVUEUlWWyoyYnY5zG6w'
        return new mapboxgl.Map({
            container: id,
            style: 'mapbox://styles/mapbox/light-v9',
            center: [longitude, latitude],
            zoom: 9,
        })
    }

    addControls = () => {
        this.map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));
    }

    addLayer = (id: string, url: string, layers: string) => {
        this.map.addLayer({
            id,
            type: 'raster',
            source: {
                type: 'raster',
                tiles: [ buildWmsUrl(url, layers)],
                tileSize: 256,
            }
        })
        this.map.setPaintProperty(id, 'raster-opacity', 0.5)

    }
    
    addLayers = () => {
        const layer = LAYER_MAPPING.RADAR
        this.map.on('load', () => this.selectLayer(layer))
    }
    
    getMap = () => this.map

    setView = ({latitude, longitude}: Coords) => {
        this.map.setCenter([longitude, latitude])
    }

    selectLayer = (layer: { id: string, url: string, layers: string}) => {
        const hasCurrentLayer = this.currentLayer !== ''
        if (hasCurrentLayer) {
            this.map.removeLayer(this.currentLayer)
            this.map.removeSource(this.currentLayer)
        }

        this.addLayer(layer.id, layer.url, layer.layers)
        this.currentLayer = layer.id
    }

    setTime = () => {
        this.currentInterval = addMinutes(this.currentInterval, 15)
        if (isFuture(this.currentInterval)) {
            this.currentInterval = threeHoursAgo()
        }
        console.log({time: this.currentInterval})
        // this.layers[1]
        //     .getSource()
        //     .set('TIME', this.currentInterval.toISOString())
    }

    stop = () => {
        console.log({ pausing: 1 })
        if (this.animationId !== null) {
            clearInterval(this.animationId)
            this.animationId = null
        }
    }

    play = () => {
        this.stop()
        this.animationId = setInterval(this.setTime, 1000 / this.frameRate)
        console.log({ playing: this.animationId })
    }
}
