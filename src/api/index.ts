import { request } from '../utils/common'
import { DarkSky } from '../types/darksky'
import darkSkyData from '../constants/darksky.json'
import { Coords, SimplePosition } from '../types/location'

export interface Feature {
    place_type: Array<string>
    type: string
    text: string
    id: string
}

interface ReverseGeocodeResponse {
    features: Array<Feature>
}

class API {
    BASE_URL = 'https://fierce-atoll-66412.herokuapp.com'
    LOCAL = `https://localhost:5000`

    getForecast = async (position: any) => {
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

    geocode = async (searchTerm: string): Promise<SimplePosition> => {
        const encodedSearch = encodeURIComponent(searchTerm)
        const url = `${this.BASE_URL}/geocode?search=${encodedSearch}`
        const { features = [] } = await request(url)

        const [ firstFeature = {} ] = features
        const { center = [] } = firstFeature
        const [ longitude, latitude ]: [ number, number ] = center

        return { coords: { latitude, longitude }}
    }

    reverseGeocode = async (position: Coordinates | Coords): Promise<ReverseGeocodeResponse> => {
        const { latitude, longitude } = position
        const url = `${this.BASE_URL}/reversegeocode?latitude=${latitude}&longitude=${longitude}`
        const response = await request(url)
        return response
    }
}

export default new API()