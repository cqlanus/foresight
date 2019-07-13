import React from 'react'
import styled from 'styled-components'

import { Current } from '../types/darksky'

import CurrentTemperature from './CurrentTemperature'
import ForecastIcon from './ForecastIcon'
import CurrentWind from './CurrentWind'

interface Props {
    currentlyData: Current
}

const Container = styled.div`
    display: grid;
    grid-template-areas:
        "temp icon wind precip sun";
    min-height: 8em;
    margin: 1em;
    border: 1px solid rgba(0,0,0,0.2);
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    border-radius: 1em;
    padding: 2rem 0;

    @media (max-width: 700px) {
        grid-template-areas:
            "temp temp icon icon"
            "temp temp icon icon"
            "wind wind precip sun"
            "wind wind precip sun";
    }
`

const ItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const TempContainer = styled(ItemContainer)`
    grid-area: temp;
`

const IconContainer = styled(ItemContainer)`
    grid-area: icon;
    flex-direction: column;
    font-size: 6em;
`

const TextContainer = styled.div`
    font-size: 1rem;
`

const WindContainer = styled(ItemContainer)`
    grid-area: wind;
`

const PrecipContainer = styled(ItemContainer)`
    grid-area: precip;
    background-color: darkgreen;
`

const CurrentConditions = ({currentlyData}: Props) => {
    console.log({currentlyData})
    const { temperature, apparentTemperature, windSpeed, windBearing, windGust, precipProbability, icon, summary } = currentlyData
    return (
        <Container>
            <TempContainer>
                <CurrentTemperature 
                    apparentTemperature={apparentTemperature}
                    temperature={temperature} />
            </TempContainer>
            <IconContainer>
                <ForecastIcon icon={icon}/>
                <TextContainer>
                    <p>{summary}</p>
                </TextContainer>
            </IconContainer>
            <PrecipContainer>{precipProbability}</PrecipContainer>
            <WindContainer>
                <CurrentWind 
                    windSpeed={windSpeed} 
                    windBearing={windBearing} 
                    windGust={windGust} />
            </WindContainer>
        </Container>
    )
}

export default CurrentConditions