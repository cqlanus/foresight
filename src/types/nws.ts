export interface NWSValue {
    validTime: Date
    value: number
}

export interface AreaResponse {
    id: string
    properties: {
        forecast: string
        forecastGridData: string
    }
}

export interface NWSGridValue {
    sourceUnit: string
    uom: string
    values: Array<NWSValue>
}

export interface GridDataProperties {
    temperature: NWSGridValue
    probabilityOfPrecipitation: NWSGridValue
    dewpoint: NWSGridValue
    maxTemperature: NWSGridValue
    minTemperature: NWSGridValue
    relativeHumidity: NWSGridValue
    windDirection: NWSGridValue
    windSpeed: NWSGridValue
    quantitativePrecipitation: NWSGridValue
    pressure: NWSGridValue
    davisStabilityIndex: NWSGridValue
    stability: NWSGridValue
    atmosphericDispersionIndex: NWSGridValue
    skyCover: NWSGridValue
}

export interface GridDataResponse {
    id: string
    properties: GridDataProperties
}


export interface LocationResponse {
    properties: {
        cwa: string
        radarStation: string
    }
}