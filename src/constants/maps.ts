
export const LAYER_MAPPING = {
    RADAR: {
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer',
        layers: '1',
        name: 'Radar',
        id: 'radar'
    },
    SATELLITE: {
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_imagery_time/MapServer/WMSServer',
        layers: [
            {
                name: 'Global SWIR',
                id: '1'
            },
            {
                name: 'Global LWIR',
                id: '5'
            },
            {
                name: 'Global V',
                id: '9'
            },
            {
                name: 'GOES SWIR',
                id: '13'
            },
            {
                name: 'GOES LWIR',
                id: '17'
            },
            {
                name: 'GOES V',
                id: '25'
            },
        ],
        name: 'Satellite',
        id: 'satellite'
    },
    RTMA: {
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_rtma_time/MapServer/WMSServer',
        layers: [
            {
                name: 'Temperature',
                id: '17'
            },
            {
                name: 'Wind Speed',
                id: '9'
            },
            {
                name: 'Wind Gusts',
                id: '5'
            },
            {
                name: 'Dew Point',
                id: '13'
            },
            {
                name: 'Precip',
                id: '21'
            },
        ],
        name: 'Current',
        id: 'rtma'
    },
    FORECAST: {
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/forecast_meteoceanhydro_sfc_ndfd_time/MapServer/WMSServer',
        layers: [
            {
                name: 'Temperature',
                id: '25'
            },
            {
                name: 'Feels Like',
                id: '17'
            },
            {
                name: 'Dew Point',
                id: '21'
            },
            {
                name: 'Humidity',
                id: '13'
            },
            {
                name: 'Chance Precip',
                id: '33'
            },
            {
                name: 'Wind Speed',
                id: '9'
            },
            {
                name: 'Wind Gusts',
                id: '5'
            },
        ],
        name: 'Forecast',
        id: 'forecast',
    },
    // LIGHTNING: {
    //     url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WMSServer',
    //     layers: '1',
    //     name: 'Lightning',
    //     id: 'lightning'
    // },
    SEVERE: {
        url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/guidance_natlcenters_meteoceanhydro_outlooks_time/MapServer/WMSServer',
        layers: '9',
        name: 'Severe Outlook',
        id: 'severe'
    }
}
