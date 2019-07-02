import { GridDataProperties } from "../types/nws"
import { FORECAST_LINKS } from "../constants/nws"
import { request } from "../utils/common"

const CHICAGO_FORECAST = "https://api.weather.gov/points/41.8781,-87.6298"

const relevantWeather: Array<keyof GridDataProperties> = [
    "temperature",
    "dewpoint",
    "maxTemperature",
    "minTemperature",
    "relativeHumidity",
    "windDirection",
    "windSpeed",
    "probabilityOfPrecipitation",
    "quantitativePrecipitation",
    "skyCover",
]

const reduceWeatherData = (data: GridDataProperties) => {
    const reducedData = relevantWeather.reduce(
        (acc: Partial<GridDataProperties>, key: keyof GridDataProperties) => {
            acc[key] = data[key]
            return acc
        },
        {}
    )
    return reducedData
}

const mapOverDays = (data: Partial<GridDataProperties>) => {
    const stuff = Object.entries(data).reduce((acc: any, current: any) => {
        const [key, value] = current
        value.values.forEach((val: { validTime: string; value: number }) => {
            const { validTime, value } = val
            const [dateStr] = validTime.split("/")
            const date = new Date(dateStr)
            const dateString = date.toISOString()

            if (acc[dateString]) {
                acc[dateString] = { ...acc[dateString], [key]: value }
            } else {
                acc[dateString] = {
                    [key]: value,
                }
            }
        })
        return acc
    }, {})
    return stuff
}

const sortObjectByKeys = (unordered: any) => {
    const ordered: any = {}
    Object.keys(unordered)
        .sort()
        .forEach(key => {
            ordered[key] = unordered[key]
        })

    return ordered
}

export const getSevenDayForecast = async (forecast: Array<any>) => {
    if (forecast.length > 0) {
        return forecast
    }
    const { properties } = await request(CHICAGO_FORECAST)
    try {
        const { properties: sevenDayProps } = await request(
            properties[FORECAST_LINKS.FORECAST]
        )
        return sevenDayProps.periods
    } catch (error) {
        throw error
    }
}

const getAllGridData = async () => {
    const { properties } = await request(CHICAGO_FORECAST)
    try {
        const { properties: gridDataProps } = await request(
            properties[FORECAST_LINKS.GRID_DATA]
        )
        const stuff = reduceWeatherData(gridDataProps)
        const whatisthis = mapOverDays(stuff)
        return sortObjectByKeys(whatisthis)
    } catch (error) {
        throw error
    }
}

export const getForecastData = async (state: any) => {
    if (Object.keys(state).length > 0) {
        return state
    }
    try {
        const allGridData = await getAllGridData()
        return allGridData
    } catch (error) {
        console.log({ error })
    }
}
