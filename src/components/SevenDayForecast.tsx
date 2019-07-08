import React from 'react'
import styled from 'styled-components'

import { getDarkskyTimestamp, formatDate } from '../utils/common'

import ForecastIcon from './ForecastIcon'

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

interface Props {
    sevenDay: Array<any>
}

const SevenDayForecast = ({ sevenDay }: Props) => {

    const renderTempRow = (hi: number, lo: number) => {
        const pipeStyle = { margin: "0 5px" }
        return (
            <TempContainer>
                <HiTemp>{Math.round(hi)}</HiTemp>
                <span style={pipeStyle}>{" | "}</span>
                <LoTemp>{Math.round(lo)}</LoTemp>
            </TempContainer>
        )
    }

    const renderDaytimeForecast = () => sevenDay.map((f: Forecast, idx: number) => (
        <DayTileContainer key={idx}>
            {formatDate(getDarkskyTimestamp(f.time))}
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