import { request } from '../utils/common'

export const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

export const getCoordinates = async (searchTerm: string = "Chicago") => {
    const encodedSearch = encodeURIComponent(searchTerm)
    const url = `https://localhost:5000/geocode?search=${encodedSearch}`
    const { features = [] } = await request(url)

    const [ firstFeature = {} ] = features
    const { center = [] } = firstFeature
    const [ longitude, latitude ] = center

    return { coords: { latitude, longitude }}
}