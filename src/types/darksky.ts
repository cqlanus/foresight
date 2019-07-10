import { Unit, unit } from 'mathjs'

export interface DarkSkyHour {
    apparentTemperature: number
    cloudCover: number
    dewPoint: number
    humidity: number
    icon: string
    ozone: number
    precipIntensity: number
    precipProbability: number
    pressure: number
    summary: string
    temperature: number
    time: number
    uvIndex: number
    windBearing: number
    windGust: number
    windSpeed: number
}

export interface DarkSkyDay {
    apparentTemperature: number
    cloudCover: number
    dewPoint: number
    humidity: number
    icon: string
    ozone: number
    precipIntensity: number
    precipProbability: number
    pressure: number
    summary: string
    temperature: number
    time: number
    uvIndex: number
    windBearing: number
    windGust: number
    windSpeed: number
    moonPhase: number
    sunriseTime: number
    sunsetTime: number
    temperatureHigh: number
    temperatureLow: number
    temperatureMax: number
    temperatureMin: number
    precipType: string
}

export interface DarkSkyResponse {
    daily: {
        data: Array<DarkSkyDay>
    },
    hourly: {
        data: Array<DarkSkyHour>
    },
    timezone: string
    latitude: number
    longitude: number
}

class Hour {
    apparentTemperature: number
    cloudCover: number
    dewPoint: Unit
    humidity: number
    icon: string
    ozone: number
    precipIntensity: Unit
    precipProbability: number
    pressure: Unit
    summary: string
    temperature: Unit
    time: number
    uvIndex: number
    windBearing: number
    windGust: Unit
    windSpeed: Unit

    constructor (network: DarkSkyHour) {
        this.apparentTemperature = network.apparentTemperature
        this.cloudCover = network.cloudCover
        this.dewPoint = unit(network.dewPoint, "degF")
        this.humidity = network.humidity
        this.icon = network.icon
        this.ozone = network.ozone
        this.precipIntensity = unit((network.precipIntensity * 100), "mm/h")
        this.precipProbability = network.precipProbability
        this.pressure = unit(network.pressure, "millibar")
        this.summary = network.summary
        this.temperature = unit(network.temperature, "degF")
        this.time = network.time
        this.uvIndex = network.uvIndex
        this.windBearing = network.windBearing
        this.windGust = unit(network.windGust, "mi/h")
        this.windSpeed = unit(network.windSpeed, "mi/h")
    }

    static of (network: DarkSkyHour) {
        return new Hour(network)
    }
}

class Day {
    apparentTemperature: number
    cloudCover: number
    dewPoint: number
    humidity: number
    icon: string
    ozone: number
    precipIntensity: number
    precipProbability: number
    pressure: number
    summary: string
    temperature: number
    time: number
    uvIndex: number
    windBearing: number
    windGust: number
    windSpeed: number
    moonPhase: number
    sunriseTime: number
    sunsetTime: number
    temperatureHigh: number
    temperatureLow: number
    temperatureMax: number
    temperatureMin: number
    precipType: string

    constructor (network: DarkSkyDay) {
        this.apparentTemperature = network.apparentTemperature
        this.cloudCover = network.cloudCover
        this.dewPoint = network.dewPoint
        this.humidity = network.humidity
        this.icon = network.icon
        this.ozone = network.ozone
        this.precipIntensity = network.precipIntensity
        this.precipProbability = network.precipProbability
        this.pressure = network.pressure
        this.summary = network.summary
        this.temperature = network.temperature
        this.time = network.time
        this.uvIndex = network.uvIndex
        this.windBearing = network.windBearing
        this.windGust = network.windGust
        this.windSpeed = network.windSpeed
        this.moonPhase = network.moonPhase
        this.sunriseTime = network.sunriseTime
        this.sunsetTime = network.sunsetTime
        this.temperatureHigh = network.temperatureHigh
        this.temperatureLow = network.temperatureLow
        this.temperatureMax = network.temperatureMax
        this.temperatureMin = network.temperatureMin
        this.precipType = network.precipType
    }

    static of (network: DarkSkyDay) {
        return new Day(network)
    }
}

export class DarkSky {
    daily: {
        data: Array<Day>
    }
    hourly: {
        data: Array<Hour>
    }
    timezone: string
    latitude: number
    longitude: number
    
    constructor(network: DarkSkyResponse) {
        this.daily = {...network.daily, data: network.daily.data.map(Day.of)}
        this.hourly = {...network.hourly, data: network.hourly.data.map(Hour.of)}
        this.timezone = network.timezone
        this.latitude = network.latitude
        this.longitude = network.longitude
    }

    static of (network: DarkSkyResponse) {
        return new DarkSky(network)
    }
}