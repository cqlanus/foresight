import { request } from '../utils/common'
import { DarkSky } from '../types/darksky'
import darkSkyData from '../constants/darksky.json'

class API {
    BASE_URL = 'https://fierce-atoll-66412.herokuapp.com'

    getForecast = async (position: any) => {
        console.log({position})
        const { coords: { latitude, longitude } } = position
        const url = `${this.BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}`
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

    geocode = async (searchTerm: string) => {
        const encodedSearch = encodeURIComponent(searchTerm)
        const url = `${this.BASE_URL}/geocode?search=${encodedSearch}`
        const { features = [] } = await request(url)

        const [ firstFeature = {} ] = features
        const { center = [] } = firstFeature
        const [ longitude, latitude ] = center

        return { coords: { latitude, longitude }}
    }
}

export default new API()