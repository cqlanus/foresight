import React from 'react'
import styled from 'styled-components'

import { Current } from '../types/darksky'

import CurrentTemperature from './CurrentTemperature'
import ForecastIcon from './ForecastIcon'
import CurrentWind from './CurrentWind'
import CurrentPrecip from './CurrentPrecip'
import CurrentDetail from './CurrentDetail'
import { scaleLinear } from 'd3-scale';
import { interpolateRgbBasis } from 'd3-interpolate';

interface Props {
    currentlyData: Current
}

// const TitleBar = styled.div`
//     font-size: 2em;
//     display: flex;
//     justify-content: space-between;
//     margin: 0 1em;
//     padding: 1em 0;
// `

// const TitleItem = styled.span``

const Grid = styled.div`
    display: grid;
    min-height: 8em;
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
    const { temperature, apparentTemperature, windSpeed, windBearing, windGust, precipProbability, 
        precipIntensity, nearestStormBearing, nearestStormDistance, icon, summary, humidity, uvIndex, dewPoint, pressure, visibility } = currentlyData
    const scale = scaleLinear().domain([0, 10])
    const uvNumber = scale(uvIndex)
    const interpolator = interpolateRgbBasis(['blue', 'green', 'goldenrod', 'red'])
    const uvColor = interpolator(uvNumber)
        return (
        <div>
            {/* <TitleBar>
                <TitleItem>Current Conditions</TitleItem>
                <TitleItem>Chicago, IL</TitleItem>
            </TitleBar> */}
            <Grid>
                <DetailsContainer>
                    <CurrentDetail 
                        title={'Humidity'} 
                        detail={humidity * 100} 
                        units={'%'} />
                    <CurrentDetail 
                        title={'Dew Point'} 
                        detail={dewPoint} 
                        units={"°"}  />
                    <CurrentDetail 
                        title={'Pressure'} 
                        detail={pressure} 
                        units={'mb'} 
                        sigfigs={5} />
                    <CurrentDetail 
                        title={'Visibility'} 
                        detail={visibility} 
                        units={'mi'} 
                        sigfigs={2} />
                    <CurrentDetail 
                        title={'UV Index'} 
                        detail={uvIndex} 
                        units={''} 
                        sigfigs={2} 
                        background={uvColor} />
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
        </div>
    )
}

export default CurrentConditions