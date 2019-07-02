import React, { useEffect, useState } from 'react'
import { LineChart, ComposedChart, Area, Line, XAxis, YAxis, Tooltip } from 'recharts'
import { format } from 'date-fns'
import { FaLocationArrow } from 'react-icons/fa'

import { getForecastData, getSevenDayForecast } from "../hooks/nws"

const Graph = ({ width = window.innerWidth, height = window.innerHeight }) => {

    const initial: { [key: string]: any } = {}
    const [gridData, setGridData] = useState(initial)
    const [sevenDay, setSevenDay] = useState([])
    console.log({ sevenDay })
    const getData = () => {
        Promise.all([getSevenDayForecast(sevenDay), getForecastData(gridData)])
            .then(([sevenDayForecast, gridData]) => {
                setGridData(gridData)
                setSevenDay(sevenDayForecast)
            })
            .catch(error => console.log({ error }))
    }

    useEffect(getData, [gridData])

    const allData: object[] = Object.entries(gridData).map(([k, v]: any) => {
        return { ...v, key: k }
    })

    // const convertToF = (val: any) => val.temperature && ((9 / 5) * val.temperature + 32).toFixed(2)
    const formatTime = (val: any) => val.key && format(val.key, "M/D")

    const renderDot = (props: { key: string, height: number, cy: number, cx: number, payload: { key: string, windDirection: number } }) => {
        const { payload: { key, windDirection } } = props
        const hasBothXAndY = props.cx && props.cy && windDirection
        const transform = `
            translate(${props.cx} ${props.cy})
            rotate(${windDirection - 45} 3 0)
            scale(.5)
        `
        return hasBothXAndY &&
            <FaLocationArrow
                key={props.key}
                cy={props.cy}
                cx={props.cx}
                height={props.height}
                transform={transform} />
    }

    return (
        <div className="blarg">
            <LineChart width={width} height={(height / 3)} data={allData}>
                <Line dot={false} connectNulls type="monotone" dataKey={"temperature"} stroke="#8884d8" strokeWidth={2} />
                <Line dot={false} connectNulls type="monotone" dataKey={"dewpoint"} stroke="goldenrod" strokeWidth={2} />
                <Tooltip />
                <XAxis tick={false} />
                <YAxis />
            </LineChart>

            <ComposedChart width={width} height={(height / 3)} data={allData}>
                <Line dot={false} connectNulls type="monotone" dataKey="relativeHumidity" stroke="indianred" strokeWidth={2} />
                <Area connectNulls type="step" dataKey="skyCover" fill="lightgrey" stroke="grey" />
                <Area connectNulls type="step" dataKey="probabilityOfPrecipitation" fill="#99d6f7" stroke="steelblue" />
                <Tooltip />
                <XAxis tick={false} />
                <YAxis />
            </ComposedChart>
            <LineChart width={width} height={(height / 3)} data={allData}>
                <Line dot={renderDot} connectNulls type="monotone" dataKey={"windSpeed"} stroke="#000" strokeWidth={2} />
                <XAxis tickCount={7} dataKey={formatTime} />
                <YAxis />
            </LineChart>
        </div>
    )
}

export default Graph