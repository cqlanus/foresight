import API from '../api'
import { Position, Coords } from '../types/location'

export const getLocation = (): Promise<Position>  => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos: Position) => resolve(pos), reject)
    })
}

export const getCoordinates = async (searchTerm: string = "Chicago"): Promise<{ coords: { latitude: number, longitude: number }}> => {
    return await API.geocode(searchTerm)
}

export const getPlace = async (position: Coords | Coordinates) => {
    const { features } = await API.reverseGeocode(position)

    const place = features.find(feature => feature.place_type.includes('place'))
    return place || {}
}