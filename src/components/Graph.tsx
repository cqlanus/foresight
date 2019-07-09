import React from 'react'
import { FaLocationArrow } from 'react-icons/fa'
import styled from 'styled-components'
import SubGraph from './SubGraph'

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
    const smallWindow = window.innerWidth < 700
    const multiple = getMultiple(window.innerWidth)
    if (index % multiple > 0) { return }
    const hasBothXAndY = cx && cy && windBearing
    const yVal = smallWindow ? height : cy

    const transform = `
        translate(${cx} ${yVal})
        rotate(${windBearing - 45 + 180} 4 4)
        scale(.6)
    `
    // console.log({ yVal })
    return hasBothXAndY &&
        <FaLocationArrow
            key={key}
            cy={cy}
            cx={cx}
            height={height}
            transform={transform} />
}

const DATA_MAP = {
    TEMP: {
        key: "temperature",
        name: "Temperature",
        type: GRAPH_TYPE.LINE,
        color: "indianred",
        axis: AXIS_TYPE.LEFT,
    },
    DEW: {
        key: "dewPoint",
        name: "Dewpoint",
        type: GRAPH_TYPE.LINE,
        color: "forestgreen",
        axis: AXIS_TYPE.LEFT,
    },
    WIND_SPEED: {
        key: "windSpeed",
        name: "Wind speed",
        type: GRAPH_TYPE.LINE,
        color: "darkslateblue",
        axis: AXIS_TYPE.LEFT,
        dot: renderArrow,
    },
    WIND_GUST: {
        key: "windGust",
        name: "Wind gust",
        type: GRAPH_TYPE.LINE,
        color: "lightslategrey",
        axis: AXIS_TYPE.LEFT,
    },
    CHANCE_PRECIP: {
        key: "precipProbability",
        name: "Chance precip",
        type: GRAPH_TYPE.AREA,
        color: "steelblue",
        stroke: "steelblue",
        isPercent: true,
        axis: AXIS_TYPE.LEFT,
    },
    QTY_PRECIP: {
        key: "precipIntensity",
        name: "Qty precip",
        type: GRAPH_TYPE.AREA,
        color: "violet",
        stroke: "darkviolet",
        isPercent: true,
        axis: AXIS_TYPE.LEFT,
    },
    CLOUD_COVER: {
        key: "cloudCover",
        name: "Cloud cover",
        type: GRAPH_TYPE.AREA,
        color: "lightgrey",
        stroke: "grey",
        isPercent: true,
        axis: AXIS_TYPE.LEFT,
    },
    HUMIDITY: {
        key: "humidity",
        name: "Humidity",
        type: GRAPH_TYPE.LINE,
        color: "limegreen",
        isPercent: true,
        axis: AXIS_TYPE.LEFT,
    },
    PRESSURE: {
        key: "pressure",
        name: "Pressure",
        type: GRAPH_TYPE.LINE,
        color: "black",
        axis: AXIS_TYPE.RIGHT,
    },
}

const TEMP_GRAPH = [DATA_MAP.TEMP, DATA_MAP.DEW]
const SKY_GRAPH = [DATA_MAP.CLOUD_COVER, DATA_MAP.CHANCE_PRECIP, DATA_MAP.QTY_PRECIP, DATA_MAP.HUMIDITY, DATA_MAP.PRESSURE]
const WIND_GRAPH = [DATA_MAP.WIND_GUST, DATA_MAP.WIND_SPEED]

const Container = styled.div`
    height: 100%;
    /* min-width: 500px; */
`
interface Props {
    dailyData: Array<any>
    hourlyData: Array<any>
}


const Graph = ({ dailyData, hourlyData }: Props) => {

    const renderTemp = () => (
        <SubGraph
            data={hourlyData}
            attributes={TEMP_GRAPH}
            dailyData={dailyData}
            domain={["dataMin - 10", "dataMax + 10"]}
            showAstroLabels />
    )

    const renderPercent = () => (
        <SubGraph
            data={hourlyData}
            attributes={SKY_GRAPH}
            domain={[0, 'auto']}
            dailyData={dailyData} />
    )

    const renderWind = () => (
        <SubGraph
            data={hourlyData}
            attributes={WIND_GRAPH}
            domain={[0, 'auto']}
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