import React from 'react'
import { FaLocationArrow } from 'react-icons/fa'
import styled from 'styled-components'
import SubGraph from './SubGraph'
import { Unit } from 'mathjs';
import { State } from '../hooks/units'

const GRAPH_TYPE = {
    LINE: "LINE",
    AREA: "AREA"
}

const AXIS_TYPE = {
    RIGHT: "right",
    LEFT: "left"
}

const DEVICE = {
    mobile: { width: 700, multiple: 10 },
    tablet: { width: 900, multiple: 5 },
    defualt: { width: 900, multiple: 3 },
}

const getMultiple = (width: number) => {
    if (width < DEVICE.mobile.width) {
        return DEVICE.mobile.multiple
    } else if (width < DEVICE.tablet.width) {
        return DEVICE.tablet.multiple
    } else {
        return DEVICE.defualt.multiple
    }
}

const renderArrow = (props: { index: number, key: string, height: number, cy: number, cx: number, payload: { key: string, windBearing: number } }) => {
    const { payload: { windBearing }, key, cy, cx, height, index } = props
    const multiple = getMultiple(window.innerWidth)
    if (index % multiple > 0) { return }
    const hasBothXAndY = cx && cy && windBearing
    const yVal = (height - 10)

    const transform = `
        translate(${cx} ${yVal})
        rotate(${windBearing - 45 + 180} 4 4)
        scale(.6)
    `
    return hasBothXAndY &&
        <FaLocationArrow
            key={key}
            cy={cy}
            cx={cx}
            height={height}
            transform={transform} />
}

const getDataMap = (units: State) => ({
    TEMP: {
        key: (d: {temperature: Unit}) => d.temperature.toNumber(units.degrees).toPrecision(3),
        name: "Temperature",
        type: GRAPH_TYPE.LINE,
        color: "indianred",
        axis: AXIS_TYPE.LEFT,
        unitKey: "degrees",
    },
    FEELS_LIKE: {
        key: (d: {apparentTemperature: Unit}) => d.apparentTemperature.toNumber(units.degrees).toPrecision(3),
        name: "Feels like",
        type: GRAPH_TYPE.LINE,
        color: "darkslategrey",
        axis: AXIS_TYPE.LEFT,
        unitKey: "degrees",
    },
    DEW: {
        key: (d: {dewPoint: Unit}) => d.dewPoint.toNumber(units.degrees).toPrecision(3),
        name: "Dewpoint",
        type: GRAPH_TYPE.LINE,
        color: "forestgreen",
        axis: AXIS_TYPE.LEFT,
        unitKey: "degrees",
    },
    WIND_SPEED: {
        key: (d: {windSpeed: Unit}) => d.windSpeed.toNumber(units.speed).toPrecision(4),
        name: "Wind speed",
        type: GRAPH_TYPE.LINE,
        color: "darkslateblue",
        axis: AXIS_TYPE.LEFT,
        dot: renderArrow,
        unitKey: "speed",
    },
    WIND_GUST: {
        key: (d: {windGust: Unit}) => d.windGust.toNumber(units.speed).toPrecision(4),
        name: "Wind gust",
        type: GRAPH_TYPE.LINE,
        color: "lightslategrey",
        axis: AXIS_TYPE.LEFT,
        unitKey: "speed",
    },
    CHANCE_PRECIP: {
        key: "precipProbability",
        name: "Chance precip",
        type: GRAPH_TYPE.AREA,
        color: "steelblue",
        stroke: "steelblue",
        isPercent: true,
        axis: AXIS_TYPE.LEFT,
        unitKey: "percent",
    },
    QTY_PRECIP: {
        key: (d: {precipIntensity: Unit}) => d.precipIntensity.toNumber(units.precip).toPrecision(3),
        name: "Qty precip",
        type: GRAPH_TYPE.AREA,
        color: "violet",
        stroke: "darkviolet",
        axis: AXIS_TYPE.LEFT,
        unitKey: "precip",
    },
    CLOUD_COVER: {
        key: "cloudCover",
        name: "Cloud cover",
        type: GRAPH_TYPE.AREA,
        color: "lightgrey",
        stroke: "grey",
        isPercent: true,
        axis: AXIS_TYPE.LEFT,
        unitKey: "percent",
    },
    HUMIDITY: {
        key: "humidity",
        name: "Humidity",
        type: GRAPH_TYPE.LINE,
        color: "limegreen",
        isPercent: true,
        axis: AXIS_TYPE.LEFT,
        unitKey: "percent",
    },
    PRESSURE: {
        key: (d: {pressure: Unit}) => d.pressure.toNumber(units.pressure).toPrecision(5),
        name: "Pressure",
        type: GRAPH_TYPE.LINE,
        color: "black",
        axis: AXIS_TYPE.RIGHT,
        unitKey: "pressure",
    },
})



const Container = styled.div`
    height: 100%;
    padding: 0 0.5em;
    /* min-width: 500px; */
`
interface Props {
    dailyData: Array<any>
    hourlyData: Array<any>
    units: State
}


const Graph = ({ dailyData, hourlyData, units }: Props) => {
    const DATA_MAP = getDataMap(units)

    const TEMP_GRAPH = [DATA_MAP.FEELS_LIKE, DATA_MAP.TEMP, DATA_MAP.DEW, ]
    const SKY_GRAPH = [DATA_MAP.CLOUD_COVER, DATA_MAP.CHANCE_PRECIP, DATA_MAP.QTY_PRECIP, DATA_MAP.HUMIDITY, DATA_MAP.PRESSURE]
    const WIND_GRAPH = [DATA_MAP.WIND_GUST, DATA_MAP.WIND_SPEED]

    const renderTemp = () => (
        <SubGraph
            data={hourlyData}
            attributes={TEMP_GRAPH}
            dailyData={dailyData}
            domain={[min => Math.round(min) - 10, max => Math.round(max) + 10]}
            units={{ left: units.degrees }}
            showAstroLabels />
    )

    const renderPercent = () => (
        <SubGraph
            data={hourlyData}
            attributes={SKY_GRAPH}
            domain={[0, 'auto']}
            units={{left: "%", right: units.pressure }}
            dailyData={dailyData} />
    )

    const renderWind = () => (
        <SubGraph
            data={hourlyData}
            attributes={WIND_GRAPH}
            domain={[0, max => Math.round(max) + 20]}
            units={{left: units.speed }}
            dailyData={dailyData} />
    )

    return (
        <Container>
            {renderTemp()}
            {renderPercent()}
            {renderWind()}
        </Container>
    )
}

export default Graph