import React from 'react'
import styled from 'styled-components'

import { Current } from '../types/darksky'

import CurrentTemperature from './CurrentTemperature'
import ForecastIcon from './ForecastIcon'
import CurrentWind from './CurrentWind'
import CurrentPrecip from './CurrentPrecip'
import CurrentDetail from './CurrentDetail'

interface Props {
    currentlyData: Current
}

const Grid = styled.div`
    display: grid;
    min-height: 8em;
    /* margin: 1em; */
    grid-template-areas: 
        "main"
        "details";
`

const ItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
`

const DetailsContainer = styled(ItemContainer)`
    background-color: #e0e1e2;
    padding: 1rem;
    flex-wrap: wrap;
`

const MainContainer = styled(ItemContainer)`
    grid-area: main;
    display: flex;
    justify-content: center;
    margin: 1rem 0;
`

const IconContainer = styled(ItemContainer)`
    grid-area: icon;
    flex-direction: column;
    justify-content: center;
    font-size: 6em;
    color: rgba(0,0,0,0.6);
    @media (max-width: 500px) {
        font-size: 4em;
        
    }
`

const TextContainer = styled.div`
    font-size: 1rem;
`

const CurrentConditions = ({currentlyData}: Props) => {
    console.log({currentlyData})
    const { temperature, apparentTemperature, windSpeed, windBearing, windGust, precipProbability, 
        precipIntensity, nearestStormBearing, nearestStormDistance, icon, summary, humidity, uvIndex, dewPoint, pressure, visibility } = currentlyData
    return (
        <Grid>
            <DetailsContainer>
                <CurrentDetail title={'Humidity'} detail={humidity * 100} units={'%'}/>
                <CurrentDetail title={'Dew Point'} detail={dewPoint} units={"°"}/>
                <CurrentDetail title={'Pressure'} detail={pressure} units={'mb'}/>
                <CurrentDetail title={'Visibility'} detail={visibility} units={'mi'}/>
                <CurrentDetail title={'UV Index'} detail={uvIndex} units={''}/>
            </DetailsContainer>
            <MainContainer>
                <CurrentTemperature 
                    apparentTemperature={apparentTemperature}
                    temperature={temperature} />
                <IconContainer>
                    <ForecastIcon icon={icon} />
                    <TextContainer>{summary}</TextContainer>
                </IconContainer>
                <CurrentPrecip
                    nearestStormBearing={nearestStormBearing}
                    nearestStormDistance={nearestStormDistance} 
                    precipIntensity={precipIntensity} 
                    precipProbability={precipProbability}
                 />
                 <CurrentWind 
                    windBearing={windBearing} 
                    windGust={windGust} 
                    windSpeed={windSpeed} />
            </MainContainer>
        </Grid>
    )
}

export default CurrentConditions