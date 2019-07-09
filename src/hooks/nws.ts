import { GridDataProperties } from "../types/nws"
import { FORECAST_LINKS } from "../constants/nws"
import { request } from "../utils/common"
import darkSkyData from "../constants/darksky.json"

const lat = "41.8781"
const lng = "-87.6298"
const position = `${lat},${lng}`
const CHICAGO_FORECAST = `https://api.weather.gov/points/${position}`

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

export const getSevenDayForecast = async () => {
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

export const getDarkSkyHourlyForecast = async () => {
    // const url = "http://localhost:5000/forecast"
    // const headers = {
    //     "Access-Control-Allow-Origin": "http://localhost:3000/",
    //     "Access-Control-Allow-Credential": true,
    // }
    // const params = {
    //     credentials: "omit",
    //     headers,
    // }
    // const response = await request(url, params)
    // return response
    return darkSkyData
}

export const getForecastData = async () => {
    try {
        const allGridData = await getAllGridData()
        return allGridData
    } catch (error) {
        console.log({ error })
    }
}
