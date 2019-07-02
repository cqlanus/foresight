export const request = async (
    url: string,
    payload: any = undefined
): Promise<any> => {
    const data = await fetch(url, payload)
    return await data.json()
}
