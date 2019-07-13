import React from 'react'
import { WiNightClear, WiDaySunny, WiRain, WiSnow, WiSleet, WiStrongWind, WiFog, WiCloudy, WiDayCloudy, WiNightAltPartlyCloudy, WiHail, WiThunderstorm, WiTornado, WiStars } from 'react-icons/wi'
import { IconType } from 'react-icons/lib/cjs';

interface IconMap {
    [key: string]: IconType
}

const ICON_MAP: IconMap = {
    "clear-day": WiDaySunny,
    "clear-night": WiNightClear,
    "rain": WiRain,
    "snow": WiSnow,
    "sleet": WiSleet,
    "wind": WiStrongWind,
    "fog": WiFog,
    "cloudy": WiCloudy,
    "partly-cloudy-day": WiDayCloudy,
    "partly-cloudy-night": WiNightAltPartlyCloudy,
    "hail": WiHail,
    "thunderstorm": WiThunderstorm,
    "tornado": WiTornado,
    "default": WiStars
}

interface Props {
    icon: keyof IconMap;
}

const ForecastIcon = ({ icon = "default" }: Props) => {
    const IconComponent = ICON_MAP[icon]
    return <IconComponent />
}

export default ForecastIcon