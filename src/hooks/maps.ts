import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
// import TileArcGISRest from 'ol/source/TileArcGISRest'
import TileWMS from 'ol/source/TileWMS'
import { transform, transformExtent } from 'ol/proj'
import OSM from 'ol/source/OSM'
import { getCenter, Extent } from 'ol/extent'
import { defaults, PinchZoom, Interaction } from 'ol/interaction'
import { subHours, addMinutes, isFuture } from 'date-fns'

import * as mapboxgl from 'mapbox-gl'



type Coords = { latitude: number; longitude: number }
const createLayers = (extent: Extent) => {
    return [
        new TileLayer({
            source: new OSM(),
        }),
        new TileLayer({
            extent: extent,
            source: new TileWMS({
                attributions: ['nowCoast'],
                url:
                    'https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer',
                params: { LAYERS: '1' },
            }),
        }),
    ]
}
const extent = transformExtent([-126, 24, -66, 50], 'EPSG:4326', 'EPSG:102100')
export const createMap = (coords: Coords) => {

    const layers = createLayers(extent)
    return new Map({
        layers,
        interactions: defaults({
            mouseWheelZoom: false,
        }),
        view: new View({
            projection: 'EPSG:102100',
            center: getCenter(extent),
            zoom: 9,
        }),
    })
}

const createNewView = ({ latitude, longitude }: Coords) => {
    const center = transform([longitude, latitude], 'EPSG:4326', 'EPSG:102100')

    const newView = new View({
        projection: 'EPSG:102100',
        center,
        zoom: 9,
    })
    return newView
}

export const setNewView = (map: Partial<Map>, coords: Coords) => {
    const newView = createNewView(coords)
    map.setView && map.setView(newView)
}

const threeHoursAgo = () => subHours(new Date(), 3)

export default class MapManager {
    // layers: Array<TileLayer>
    map: mapboxgl.Map
    currentInterval: Date
    animationId: number | null
    frameRate: number

    constructor(coords: Coords) {
        this.map = this.createMap(coords)
        this.currentInterval = threeHoursAgo()
        this.animationId = null
        this.frameRate = 0.5
    }

    createMap = ({ latitude, longitude }: Coords) => {
        (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiY3FsYW51cyIsImEiOiJjanh5czV1ZWYwZG5pM25wZWtiYzV3emtlIn0.qNuQVUEUlWWyoyYnY5zG6w'
        return new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v9',
            center: [longitude, latitude],
            zoom: 9
            
        })
    }
    
    getMap = () => this.map

    setView = ({latitude, longitude}: Coords) => {
        this.map.setCenter([longitude, latitude])
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
