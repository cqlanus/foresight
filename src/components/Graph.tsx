import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, CartesianGrid, ComposedChart, Area, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { FaLocationArrow } from 'react-icons/fa'
import { WiMoonFirstQuarter } from "react-icons/wi"
import styled from 'styled-components'
import { getDarkSkyHourlyForecast } from "../hooks/nws"
import { getDarkskyTimestamp, isMorning, formatDate } from '../utils/common';

const DATA_NAME = {
    TEMP: "Temperature",
    DEW: "Dewpoint",
    WIND_SPEED: "Wind speed",
    WIND_GUST: "Wind gust",
    CHANCE_PRECIP: "Chance precip",
    QTY_PRECIP: "Qty precip",
    CLOUD_COVER: "Cloud cover",
    HUMIDITY: "Humidity",
    PRESSURE: "Pressure",
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`
interface Props {
    sevenDay: Array<any>
}

const AstroGraphic = ({ payload, show }: { payload?: any, show: boolean }) => {
    const time = payload.value
    const isAm = isMorning(time)
    const formatted = formatDate(time, "h:ma")
    const rotate = isAm ? -90 : 90
    const rotateVal = isAm ? `${rotate} 12 20` : `${rotate} -2 10`
    const transform = `
        translate(${payload.coordinate},-10)
        rotate(${rotateVal})
    `
    return <g transform={transform}>
        {show && <WiMoonFirstQuarter fill={isAm ? "gold" : "orange"} />}
    </g>
}

const getAstroTicks = (sevenDay: Array<any>) => {
    return sevenDay.reduce((acc, day) => {
        const { sunriseTime, sunsetTime } = day
        return [...acc, sunriseTime, sunsetTime]
    }, [])
}

const WunderXAxis = (sevenDay: Array<any>, showLabels: boolean = false) => {
    const ticks = getAstroTicks(sevenDay)
    return <XAxis
        orientation="top"
        type="number"
        scale='time'
        domain={["dataMin", "dataMax"]}
        dataKey={d => getDarkskyTimestamp(d.time)}
        ticks={ticks}
        allowDataOverflow
        tick={<AstroGraphic show={showLabels} />}
        tickCount={ticks.length}
        interval={0}
        height={20}
    />
}

const Graph = ({ sevenDay }: Props) => {

    const [gridData, setGridData] = useState([])
    const getData = async () => {
        try {
            const darkSkyData = await getDarkSkyHourlyForecast()
            console.log({ darkSkyData })
            setGridData(darkSkyData.hourly.data)
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const getAstronomyData = () => {
        return sevenDay.map(({ time, sunriseTime, sunsetTime, moonPhase }) => ({
            time: getDarkskyTimestamp(time),
            sunriseTime: getDarkskyTimestamp(sunriseTime),
            sunsetTime: getDarkskyTimestamp(sunsetTime),
            moonPhase
        }))
    }

    const astronomyData = getAstronomyData()

    const convertToPercent = (label: string) => (stuff: { [key: string]: number }) => {
        return stuff[label] * 100
    }

    const renderArrow = (props: { index: number, key: string, height: number, cy: number, cx: number, payload: { key: string, windBearing: number } }) => {
        const { payload: { key, windBearing }, index } = props
        if (index % 2 > 0) { return }
        const hasBothXAndY = props.cx && props.cy && windBearing
        const transform = `
            translate(${props.cx} ${props.cy})
            rotate(${windBearing - 45 + 180})
            scale(.6)
        `
        return hasBothXAndY &&
            <FaLocationArrow
                key={props.key}
                cy={props.cy}
                cx={props.cx}
                height={props.height}
                transform={transform} />
    }



    const numberFormatter = (val: string | number | (string | number)[]) => Number.parseFloat(String(val)).toPrecision(3)
    const tooltipFormatter = (val: string | number | (string | number)[], name: string) => {
        const value = numberFormatter(val)
        return [value, " "]
    }
    const labelFormatter = (d: string | number) => formatDate(+d, "ha")


    const tooltipStyle = { backgroundColor: 'rgba(255,255,255,.7)', border: 'none' }
    const renderTemp = () => (
        <ResponsiveContainer height={"33%"} >
            <ComposedChart syncId="weather" data={gridData}>
                <CartesianGrid stroke="#eee" />

                <Line dot={false} connectNulls type="monotone" dataKey="temperature" stroke="navy" strokeWidth={2} name={DATA_NAME.TEMP} />
                <Line dot={false} connectNulls type="monotone" dataKey="dewPoint" stroke="orange" strokeWidth={2} name={DATA_NAME.DEW} />
                <Tooltip labelFormatter={labelFormatter} contentStyle={tooltipStyle} formatter={tooltipFormatter} separator={" "} />
                {WunderXAxis(astronomyData, true)}

                <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
                <YAxis orientation="right" yAxisId="right" />
                <Legend verticalAlign="bottom" height={36} />
            </ComposedChart>
        </ResponsiveContainer>
    )

    const renderPercent = () => (
        <ResponsiveContainer height={"33%"} >
            <ComposedChart syncId="weather" data={gridData}>
                <CartesianGrid stroke="#eee" />

                <Area yAxisId="left" connectNulls type="step" dataKey={convertToPercent("cloudCover")} fill="lightgrey" stroke="grey" name={DATA_NAME.CLOUD_COVER} />
                <Area yAxisId="left" connectNulls type="step" dataKey={convertToPercent("precipProbability")} fill="#99d6f7" stroke="steelblue" name={DATA_NAME.CHANCE_PRECIP} />
                <Area yAxisId="left" connectNulls type="step" dataKey={convertToPercent("precipIntensity")} fill="violet" stroke="violet" name={DATA_NAME.QTY_PRECIP} />
                <Line yAxisId="left" dot={false} connectNulls type="monotone" dataKey={convertToPercent("humidity")} stroke="indianred" strokeWidth={2} name={DATA_NAME.HUMIDITY} />
                <Line yAxisId="right" dot={false} connectNulls type="monotone" dataKey="pressure" stroke="black" strokeWidth={2} name={DATA_NAME.PRESSURE} />
                <Tooltip labelFormatter={labelFormatter} contentStyle={tooltipStyle} formatter={tooltipFormatter} separator={" "} />
                {WunderXAxis(astronomyData)}
                <YAxis yAxisId="left" />
                <YAxis orientation="right" domain={["dataMin - 3", "dataMax + 3"]} yAxisId="right" />
                <Legend verticalAlign="bottom" height={36} />
            </ComposedChart>
        </ResponsiveContainer>
    )

    const renderWind = () => (
        <ResponsiveContainer height={"33%"} >
            <ComposedChart syncId="weather" data={gridData}>
                <CartesianGrid stroke="#eee" />

                <Line dot={renderArrow} connectNulls type="monotone" dataKey="windSpeed" stroke="#000" strokeWidth={2} name={DATA_NAME.WIND_SPEED} />
                <Line dot={false} connectNulls type="monotone" dataKey="windGust" stroke="teal" strokeWidth={2} name={DATA_NAME.WIND_GUST} />
                {WunderXAxis(astronomyData)}
                <YAxis />
                <YAxis orientation="right" yAxisId="right" />
                <Tooltip labelFormatter={labelFormatter} contentStyle={tooltipStyle} formatter={tooltipFormatter} separator={" "} />
                <Legend verticalAlign="bottom" height={36} />
            </ComposedChart>
        </ResponsiveContainer>
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