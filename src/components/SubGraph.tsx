import React from 'react'
import { ResponsiveContainer, CartesianGrid, ComposedChart, Area, Line, XAxis, YAxis, Tooltip, Legend, AxisDomain } from 'recharts'
import { WiMoonFirstQuarter } from "react-icons/wi"
import { getDarkskyTimestamp, isMorning, formatDate, convertToPercent } from '../utils/common';
// import { convert, UnitKeys } from '../utils/units'

const AstroGraphic = ({ payload, show }: { payload?: any, show: boolean }) => {
    const time = payload.value
    const isAm = isMorning(time)
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

const getAstroTicks = (dailyData: Array<any>) => {
    return dailyData.reduce((acc, day) => {
        const { sunriseTime, sunsetTime } = day
        return [...acc, sunriseTime, sunsetTime]
    }, [])
}

const WunderXAxis = (dailyData: Array<any>, showLabels: boolean = false) => {
    const ticks = getAstroTicks(dailyData)
    const height = showLabels ? 20 : 2
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
        tickLine={false}
        interval={0}
        height={height}
    />
}

interface Attribute {
    key: string | any,
    name: string,
    type: string,
    color: string,
    stroke?: string,
    axis?: string,
    isPercent?: boolean,
    unitKey: string
    dot?: (props: DotProps) => any
}

interface DotProps {
    index: number,
    key: string,
    height: number,
    cy: number,
    cx: number,
    payload: {
        key: string,
        windBearing: number
    }
}

interface Props {
    data: Array<any>,
    dailyData: Array<any>,
    attributes: Array<Attribute>,
    showAstroLabels?: boolean,
    domain?: [AxisDomain, AxisDomain]
    units: {
        left: string,
        right?: string
    }
}

const SubGraph = ({
    data,
    dailyData,
    attributes,
    showAstroLabels = false,
    domain = [0, 'auto'],
    units
}: Props) => {

    // const convertValue = (attribute: Attribute) => {}

    const renderLine = (attribute: Attribute) => {
        const { dot = false } = attribute
        const axis = attribute.name === "Pressure" && { yAxisId: "right" }
        const key = attribute.isPercent ? convertToPercent(attribute.key) : attribute.key
        return <Line
            key={attribute.key}
            {...axis}
            dot={dot || false}
            connectNulls
            type="monotone"
            dataKey={key}
            stroke={attribute.color}
            strokeWidth={2}
            name={attribute.name} />
    }
    const renderArea = (attribute: Attribute) => {
        const axis = attribute.key === "pressure" && { yAxisId: "right" }
        const key = attribute.isPercent ? convertToPercent(attribute.key) : attribute.key

        return <Area
            key={attribute.key}
            {...axis}
            connectNulls
            type="step"
            dataKey={key}
            fill={attribute.color}
            stroke={attribute.stroke}
            name={attribute.name} />
    }

    const renderData = () => {
        return attributes.map(attribute => {
            if (attribute.type === "LINE") {
                return renderLine(attribute)
            } else {
                return renderArea(attribute)
            }
        })
    }

    const labelFormatter = (d: string | number) => formatDate(+d, "ha")

    const tooltipStyle = { backgroundColor: 'rgba(255,255,255,.7)', border: 'none' }

    const numberFormatter = (val: string | number | (string | number)[]) =>
        Number.parseFloat(String(val)).toPrecision(3)

    const tooltipFormatter = (val: string | number | (string | number)[], name: string) => {
        const value = numberFormatter(val)
        return [value, ""]
    }

    const getAstronomyData = () => {
        return dailyData.map(({ time, sunriseTime, sunsetTime, moonPhase }) => ({
            time: getDarkskyTimestamp(time),
            sunriseTime: getDarkskyTimestamp(sunriseTime),
            sunsetTime: getDarkskyTimestamp(sunsetTime),
            moonPhase
        }))
    }

    const astronomyData = getAstronomyData()

    interface Label {
        value: string | undefined
        angle: number
        position: string
    }
    return (
        <ResponsiveContainer height={"33%"} >
            <ComposedChart syncId="weather" data={data}>
                <CartesianGrid stroke="#eee" />

                {renderData()}
                <Tooltip labelFormatter={labelFormatter} contentStyle={tooltipStyle} formatter={tooltipFormatter} separator={" "} />
                {WunderXAxis(astronomyData, showAstroLabels)}

                <YAxis tick={{ fontSize: "10px" }} label={{value: units.left, angle: -90, position: 'insideLeft'}} domain={domain} />
                <YAxis tick={{ fontSize: "10px" }} label={{value: units.right, angle: 90, position: 'insideRight'}} orientation="right" yAxisId="right" domain={["dataMin - 10", "dataMax + 10"]} />
                <Legend verticalAlign="bottom" height={36} />
            </ComposedChart>
        </ResponsiveContainer>
    )
}
export default SubGraph