import API from '../api'
import { Position, Coords, Place } from '../types/location'

export const getLocation = (): Promise<Position>  => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos: Position) => resolve(pos), reject)
    })
}

export const getCurrentLocation = async () => {
    try {
        const { coords } = await getLocation()
        const place = await getPlace(coords)
        return place
    } catch (error) {
        console.log({error})
    }
}

export const getCoordinates = async (searchTerm: string = "Chicago"): Promise<{ coords: { latitude: number, longitude: number }}> => {
    return await API.geocode(searchTerm)
}

export const getPlace = async (position: Coords | Coordinates): Promise<Place | undefined> => {
    const { features } = await API.reverseGeocode(position)

    const place = features.find(feature => feature.place_type.includes('place'))
    if (place) {
        const { geometry: { coordinates } } = place
        const [ longitude, latitude ] = coordinates
        return {...place, coords: { longitude, latitude } }

    }
}