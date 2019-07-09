const success = pos => {
    console.log({ pos })
}
const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(success, reject)
    })
}

export const getUserLocation = async () => {
    const position = await getLocation()
    console.log({ position })
}
