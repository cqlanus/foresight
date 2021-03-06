import { request } from '../utils/common'
import { DarkSky } from '../types/darksky'
import { Coords, SimplePosition, Place } from '../types/location'
import { LocationResponse } from '../types/nws';

interface ReverseGeocodeResponse {
    features: Array<Place>
}

class API {
    BASE_URL = 'http://darkskyserver-env.ay8mnafzh5.us-east-2.elasticbeanstalk.com'
    LOCAL = 'https://localhost:5000'
    NWS_URL = 'https://api.weather.gov'

    getForecast = async (position: any) => {
        const { coords: { latitude, longitude } } = position
        const url = `${this.BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}`
        const params = {
            credentials: "omit",
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
        const { center = [], bbox } = firstFeature
        const [ longitude, latitude ]: [ number, number ] = center

        return { coords: { latitude, longitude }, bbox }
    }

    reverseGeocode = async (position: Coordinates | Coords): Promise<ReverseGeocodeResponse> => {
        const { latitude, longitude } = position
        const url = `${this.BASE_URL}/reversegeocode?latitude=${latitude}&longitude=${longitude}`
        const response = await request(url)
        return response
    }

    closestLocation = async ({ latitude, longitude }: Coords): Promise<LocationResponse> => {
        const point = `${latitude},${longitude}`
        const url = `${this.NWS_URL}/points/${point}`
        const response = await request(url)

        return response

    }
}

export default new API()
