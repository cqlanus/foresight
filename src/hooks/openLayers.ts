import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
// import TileArcGISRest from 'ol/source/TileArcGISRest'
import TileWMS from 'ol/source/TileWMS'
import { transform, transformExtent } from 'ol/proj'
import OSM from 'ol/source/OSM';
import { getCenter } from 'ol/extent';

type Coords = {latitude: number, longitude: number }
export const createMap = (coords: Coords) => {

    // const bbox = ['-15578640.92640406','2182661.2789739748','-6557848.596303097','7299661.700495453']
    
    // const url = `https://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/sat_meteo_imagery_time/MapServer/export?transparent=true&format=png8&layers=show%3A3&bbox=${bbox.join('%2C')}&bboxSR=3857&imageSR=3857&size=922%2C523&f=image`
    const extent = transformExtent([-126, 24, -66, 50], 'EPSG:4326', 'EPSG:102100')
    const layers = [
        new TileLayer({
          source: new OSM()
        }),
        new TileLayer({
            extent: extent,
            source: new TileWMS({
              attributions: ['nowCoast'],
              url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer',
              params: {LAYERS: '1'}
            })
          })
        // new TileLayer({
        //   extent: bbox.map(Number),
        //   source: new TileArcGISRest({ urls: [url] })
        // })
    ]
    const view = createNewView(coords)
    return new Map({
        layers,
        view: new View({
            projection: "EPSG:102100",
            center: getCenter(extent),
          zoom: 8
        })
    });
}

const createNewView = ({latitude, longitude}: Coords) => {
    const center = transform([longitude, latitude],"EPSG:4326", "EPSG:102100")

    const newView = new View({
        projection: "EPSG:102100",
        center,
      zoom: 8
    })
    return newView
}

export const setNewView = (map: Partial<Map>, coords: Coords) => {
    const newView = createNewView(coords)
    map.setView && map.setView(newView)
}