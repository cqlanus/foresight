import API from '../api'

export const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

export const getCoordinates = async (searchTerm: string = "Chicago") => {
    return await API.geocode(searchTerm)
}