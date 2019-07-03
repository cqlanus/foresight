import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import moment from 'moment-timezone'

import ForecastIcon from './ForecastIcon'

import { getSevenDayForecast, getDarkSkyHourlyForecast } from "../hooks/nws"

interface Forecast {
    isDaytime: boolean
    summary: string
    icon: string
    name: string
    time: number
    temperatureLow: number
    temperatureHigh: number
}

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 1em 60px;
    width: calc(100% - 120px);
`

const DayTileContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 16;
    margin-right: .5em;
    min-width: 0;

    flex-basis: calc(100% / 8);
`
const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3em;
`

const Summary = styled.span`
    font-size: 12px;

    @media (max-width: 700px) {
        display: none;
    }
`

const TempContainer = styled.div`
    flex-grow: 1;
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;

`

const HiTemp = styled.p`
    color: OrangeRed;
`

const LoTemp = styled.p`
    color: steelblue;
`

const SevenDayForecast = () => {
    const [sevenDay, setSevenDay] = useState([])

    const getData = async () => {
        try {
            const darkSkyData = await getDarkSkyHourlyForecast()
            console.log({ daily: darkSkyData.daily.data })
            setSevenDay(darkSkyData.daily.data)
        } catch (error) {
            console.log({ error })
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const getDarkskyTimestamp = (time: number): number => {
        const timeString = `${time}000`
        return +timeString
    }
    const formatDateName = (time: number) => moment(time).tz("America/Chicago").format("dd")

    const renderTempRow = (hi: number, lo: number) => {
        return (
            <TempContainer>
                <HiTemp>{Math.round(hi)}</HiTemp>
                <span style={{ margin: "0 5px" }}>{" | "}</span>
                <LoTemp>{Math.round(lo)}</LoTemp>
            </TempContainer>
        )
    }

    const renderDaytimeForecast = () => sevenDay.map((f: Forecast, idx: number) => (
        <DayTileContainer key={idx}>
            {formatDateName(getDarkskyTimestamp(f.time))}
            {renderTempRow(f.temperatureHigh, f.temperatureLow)}

            <IconContainer>
                <ForecastIcon icon={f.icon} />
            </IconContainer>
            <Summary>
                {f.summary}
            </Summary>
        </DayTileContainer>
    ))

    return (
        <Container>
            {renderDaytimeForecast()}

        </Container>
    )
}

export default SevenDayForecast