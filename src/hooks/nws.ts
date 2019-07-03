import { GridDataProperties } from "../types/nws"
import { FORECAST_LINKS } from "../constants/nws"
import { request } from "../utils/common"
const darkSkyData = require('../constants/darksky.json')

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

const WEATHERBIT_KEY = "5d394d2880a547039ce94cd23a29676c"
export const getWeatherBitForecast = async () => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT_KEY}&city=Chicago,IL`
    const { data } = await request(url)
    return data
}

export const getWeatherBitHourlyForecast = async () => {
    const url = ` https://api.weatherbit.io/v2.0/forecast/hourly?key=${WEATHERBIT_KEY}&hours=50&lat=${lat}&lon=${lng}`
    const { data } = await request(url)
    return data
}

export const getDarkSkyHourlyForecast = async () => {
    // const url = "http://localhost:5000/forecast"
    // const headers = {
    //     "Access-Control-Allow-Origin": "*"
    // }
    // const response = await request(url, {headers})
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
