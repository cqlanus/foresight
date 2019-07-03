import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, Tooltip } from 'recharts'
// import { format } from 'date-fns'
// import moment from 'moment-timezone'
import { FaLocationArrow } from 'react-icons/fa'
import styled from 'styled-components'
import { /* getWeatherBitHourlyForecast, */ getDarkSkyHourlyForecast } from "../hooks/nws"

const DATA_NAME = {
    TEMP: "Temperature",
    DEW: "Dew point",
    WIND_SP: "Wind speed",
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
const Graph = ({ width = window.innerWidth, height = window.innerHeight }) => {

    const [gridData, setGridData] = useState([])
    const getData = async () => {
        try {
            const darkSkyData = await getDarkSkyHourlyForecast()
            console.log({ darkSkyData })
            // const data = await getWeatherBitHourlyForecast()
            // console.log({data})
            setGridData(darkSkyData.hourly.data)
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        getData()
    }, [])


    // const convertToF = (val: any) => val.temp && ((9 / 5) * val.temp + 32).toFixed(2)
    // const formatTime = (val: any) => val.timestamp_local && format(val.timestamp_local, "ha")
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

    const renderTemp = () => (
        <ResponsiveContainer height={"33%"} >
            <ComposedChart syncId="weather" data={gridData}>
                <Line dot={false} connectNulls type="monotone" dataKey="temperature" stroke="navy" strokeWidth={2} name={DATA_NAME.TEMP} />
                <Line dot={false} connectNulls type="monotone" dataKey="dewPoint" stroke="orange" strokeWidth={2} name={DATA_NAME.DEW} />
                <Tooltip /* formatter={(val: string | number | (string | number)[]) => Math.round(+val)} */ />
                <XAxis tick={false} /* dataKey="time" tickFormatter={t => {
                    const newTime = `${t}000`
                    const time = moment(+newTime).tz("America/Chicago")
                    console.log({time})
                    return time.format('dd ha')
                    }}  *//>
                <YAxis domain={["dataMin - 10", "dataMax + 10"]} />
                <YAxis orientation="right" yAxisId="right" />
            </ComposedChart>
        </ResponsiveContainer>
    )

    const renderPercent = () => (
        <ResponsiveContainer height={"33%"} >
            <ComposedChart syncId="weather" data={gridData}>
                <Area yAxisId="left" connectNulls type="step" dataKey={convertToPercent("cloudCover")} fill="lightgrey" stroke="grey" name={DATA_NAME.CLOUD_COVER} />
                <Area yAxisId="left" connectNulls type="step" dataKey={convertToPercent("precipProbability")} fill="#99d6f7" stroke="steelblue" name={DATA_NAME.CHANCE_PRECIP} />
                <Area yAxisId="left" connectNulls type="step" dataKey={convertToPercent("precipIntensity")} fill="violet" stroke="steelblue" name={DATA_NAME.QTY_PRECIP} />
                <Line yAxisId="left" dot={false} connectNulls type="monotone" dataKey={convertToPercent("humidity")} stroke="indianred" strokeWidth={2} name={DATA_NAME.HUMIDITY} />
                <Line yAxisId="right" dot={false} connectNulls type="monotone" dataKey="pressure" stroke="black" strokeWidth={2} name={DATA_NAME.PRESSURE} />
                <Tooltip /* formatter={(val: string | number | (string | number)[]) => Number(val).toFixed(2)} */ />
                <XAxis tick={false} />
                <YAxis yAxisId="left" />
                <YAxis orientation="right" domain={["dataMin - 3", "dataMax + 3"]} yAxisId="right" />
            </ComposedChart>
        </ResponsiveContainer>
    )

    const renderWind = () => (
        <ResponsiveContainer height={"33%"} >
            <ComposedChart syncId="weather" data={gridData}>
                <Line dot={renderArrow} connectNulls type="monotone" dataKey="windSpeed" stroke="#000" strokeWidth={2} />
                <Line yAxisId="right" dot={false} connectNulls type="monotone" dataKey="windBearing" stroke="pink" strokeWidth={2} />
                <Line dot={false} connectNulls type="monotone" dataKey="windGust" stroke="teal" strokeWidth={2} />
                <XAxis /* tickCount={7} dataKey={formatTime}  */ tick={false} />
                <YAxis />
                <YAxis orientation="right" yAxisId="right" />
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