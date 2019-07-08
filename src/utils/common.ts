import moment from "moment-timezone"
export const request = async (
    url: string,
    payload: any = undefined
): Promise<any> => {
    const data = await fetch(url, payload)
    return await data.json()
}

export const getDarkskyTimestamp = (time: number): number => {
    const timeString = `${time}000`
    return +timeString
}

export const formatDate = (time: number, format: string = "dd") =>
    moment(time)
        .tz("America/Chicago")
        .format(format)

export const isMorning = (time: number) => {
    const formatted = moment(time).format("a")
    return formatted === "am"
}
