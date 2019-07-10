import { GridDataProperties } from "../types/nws"
import { FORECAST_LINKS } from "../constants/nws"
import { request } from "../utils/common"
// import darkSkyData from "../constants/darksky.json"
import { DarkSky } from '../types/darksky'

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

export const getDarkSkyHourlyForecast = async (position: any): Promise<DarkSky> => {
    const { coords: { latitude, longitude } } = position
    const url = `https://localhost:5000/forecast?latitude=${latitude}&longitude=${longitude}`
    const headers = {
        "Access-Control-Allow-Origin": "https://localhost:3000/",
        "Access-Control-Allow-Credential": true,
    }
    const params = {
        credentials: "omit",
        headers,
    }
    const response = await request(url, params)
    return new DarkSky(response)
    // return await new DarkSky(darkSkyData)
}

export const getForecastData = async () => {
    try {
        const allGridData = await getAllGridData()
        return allGridData
    } catch (error) {
        console.log({ error })
    }
}

const productUrl = (productId: string) => `https://api.weather.gov/products/${productId}`

const getLatestDiscussionId = async (locationId: string = "LOT") => {
    try {
        const url = `https://api.weather.gov/products/types/AFD/locations/${locationId}`
        const response = await request(url)
        const [ firstLink = {} ] = response["@graph"]
        return firstLink.id
    } catch (error) {
        console.log({error})
    }
}

export type DiscussionObj = { [ key: string ]: Array<string> }

const titlePattern = /\.([A-Za-z\s])*\.\.\./
const formatTitle = (rawTitle: string) => {
    const pattern = rawTitle.match(titlePattern) || []
    return pattern[0].replace(/\./g, "")
}

const formatDiscussion = (text: string) => {
    const split = text.split('\n\n').map(t => t.replace(/\n/g, ' ').trim())

    let currentTitle = ""
    const discussionObject = split.reduce((acc: DiscussionObj, curr: string) => {
        if (curr[0] === ".") {
            const title = formatTitle(curr)
            currentTitle = title
            acc[title] = []
        } else {
            let currentParagraphs = acc[currentTitle]
            if (currentParagraphs) {
                acc[currentTitle] = [ ...currentParagraphs, curr ]
            }
        }
        return acc
    }, {})

    return discussionObject
}

export const getScentificDiscussion = async (locationId: string = "LOT") => {
    try {
        const productId = await getLatestDiscussionId(locationId)
        const url = productUrl(productId)
        const discussion = await request(url)
        const { productText = "" } = discussion || {}
        return formatDiscussion(productText)
    } catch (error) {
        console.log({error})
    }
}
