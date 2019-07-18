import React from 'react'
import styled from 'styled-components'

import { Current } from '../types/darksky'

import CurrentTemperature from './CurrentTemperature'
import CurrentWind from './CurrentWind'
import CurrentPrecip from './CurrentPrecip'
import CurrentDetail from './CurrentDetail'
import CurrentSummary from './CurrentSummary'
import { scaleLinear } from 'd3-scale';
import { interpolateRgbBasis } from 'd3-interpolate';

import { ThemeContext } from '../context/theme'
import { Place } from '../types/location';

interface DetailProps {
    isDarkMode: boolean
}

interface Props {
    currentlyData: Current,
    place: Place
}

const TitleBar = styled.div`
    font-size: 2em;
    line-height: 1em;
    display: flex;
    justify-content: space-between;
    margin: 0 1em;
    padding: 1em 0;
`

const TitleItem = styled.span``

const ItemContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
`

const DetailsContainer = styled(ItemContainer)`
    background-color: ${(p: DetailProps) => p.isDarkMode ? 'black' : '#e0e1e2'};
    color: ${(p: DetailProps) => p.isDarkMode ? 'white' : 'black'};
    padding: 1rem;
    flex-wrap: wrap;
`
const SubContainer = styled.div`
    display: flex;
    justify-content: center;
`

const MainContainer = styled(ItemContainer)`
    grid-area: main;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    /* display: grid; */
    grid-template-areas: 
        "temp icon precip wind";
    margin: 1rem 0;

    @media (max-width: 500px) {
        grid-template-areas: 
            "temp icon"
            "precip wind";
    }
`

const PrecipContainer = styled(ItemContainer)`
    grid-area: precip;
`

const WindContainer = styled(ItemContainer)`
    grid-area: wind;
`

const CurrentConditions = ({currentlyData, place}: Props) => {
    const { temperature, apparentTemperature, windSpeed, windBearing, windGust, precipProbability, 
        precipIntensity, nearestStormBearing, nearestStormDistance, icon, summary, humidity = 0, uvIndex, dewPoint, pressure, visibility } = currentlyData
    const scale = scaleLinear().domain([0, 10])
    const uvNumber = scale(uvIndex)
    const interpolator = interpolateRgbBasis(['blue', 'green', 'goldenrod', 'red'])
    const uvColor = interpolator(uvNumber)

    const renderDetails = () => (
        <ThemeContext.Consumer>

        {({isDarkMode}) =>
            <DetailsContainer isDarkMode={isDarkMode} >
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
        }
        </ThemeContext.Consumer>
        
    )
    
    return (
        <div>
            <TitleBar>
                <TitleItem>{place.text || "Current Location"}</TitleItem>
            </TitleBar>
                
                <MainContainer>
                    <SubContainer>
                        <CurrentTemperature 
                            apparentTemperature={apparentTemperature}
                            temperature={temperature} />
                        <CurrentSummary icon={icon} summary={summary} />
                    </SubContainer>
                    <SubContainer>
                        <PrecipContainer>
                            <CurrentPrecip
                                nearestStormBearing={nearestStormBearing}
                                nearestStormDistance={nearestStormDistance} 
                                precipIntensity={precipIntensity} 
                                precipProbability={precipProbability}
                            />
                        </PrecipContainer>
                        <WindContainer>
                            <CurrentWind 
                                windBearing={windBearing} 
                                windGust={windGust} 
                                windSpeed={windSpeed} />
                        </WindContainer>
                    </SubContainer>
                </MainContainer>

                { renderDetails() }
                
        </div>
    )
}

export default CurrentConditions