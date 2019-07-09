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
    /* min-width: calc(500px - 120px); */
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
    @media (max-width: 700px) {
        font-size: 2.5em;
    }
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

    @media (max-width: 700px) {
        flex-direction: column;
        flex-grow: 0;
    }
`

const P = styled.p`
    margin: 0.5em 0;
`

const HiTemp = styled(P)`
    color: OrangeRed;
`

const LoTemp = styled(P)`
    color: steelblue;
`

const Separator = styled.span`
    margin: 0 5px;
    font-size: 18px;
    font-weight: normal;

    &:before {
        content: "|"
    }

    @media (max-width: 700px) {
        &:before {
            content: ""
        }
        border-bottom: 2px solid #000;
        width: 100%;
    }
`

interface Props {
    dailyData: Array<any>
}

const SevenDayForecast = ({ dailyData }: Props) => {

    const renderTempRow = (hi: number, lo: number) => {
        return (
            <TempContainer>
                <HiTemp>{Math.round(hi)}</HiTemp>
                <Separator></Separator>
                <LoTemp>{Math.round(lo)}</LoTemp>
            </TempContainer>
        )
    }

    const renderDaytimeForecast = () => dailyData.map((f: Forecast, idx: number) => (
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