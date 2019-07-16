import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
// import TileArcGISRest from 'ol/source/TileArcGISRest'
import TileWMS from 'ol/source/TileWMS'
import { transform, transformExtent } from 'ol/proj'
import OSM from 'ol/source/OSM'
import { getCenter, Extent } from 'ol/extent'
import { defaults, PinchZoom, Interaction } from 'ol/interaction'
import { subHours, addMinutes, isFuture } from 'date-fns'


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
        // new TileLayer({
        //   extent: bbox.map(Number),
        //   source: new TileArcGISRest({ urls: [url] })
        // })
    ]
}
const extent = transformExtent([-126, 24, -66, 50], 'EPSG:4326', 'EPSG:102100')
export const createMap = (coords: Coords) => {
    // const bbox = ['-15578640.92640406','2182661.2789739748','-6557848.596303097','7299661.700495453']

    // const url = `https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_imagery_time/MapServer/export?transparent=true&format=png8&layers=show%3A3&bbox=${bbox.join('%2C')}&bboxSR=3857&imageSR=3857&size=922%2C523&f=image`

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
    layers: Array<TileLayer>
    map: Map
    currentInterval: Date
    animationId: number | null
    frameRate: number

    constructor(coords: Coords) {
        this.layers = createLayers(extent)
        this.map = createMap(coords)
        this.currentInterval = threeHoursAgo()
        this.animationId = null
        this.frameRate = 0.5
    }

    getMap = () => this.map

    setView = (coords: Coords) => {
        setNewView(this.map, coords)
    }

    setTime = () => {
        this.currentInterval = addMinutes(this.currentInterval, 15)
        if (isFuture(this.currentInterval)) {
            this.currentInterval = threeHoursAgo()
        }
        console.log({time: this.currentInterval})
        this.layers[1]
            .getSource()
            .set('TIME', this.currentInterval.toISOString())
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
