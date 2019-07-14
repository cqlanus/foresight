import React from 'react'
import styled from 'styled-components'

import ForecastIcon from './ForecastIcon'

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 6rem;
    color: steelblue;
`

const Text = styled.p`
    font-size: 2rem;
`

interface Props {
    nearestStormDistance: number
    nearestStormBearing: number
    precipIntensity: number
    precipProbability: number
}

const CurrentPrecip = ({ 
    nearestStormBearing, 
    nearestStormDistance, 
    precipIntensity = 0, 
    precipProbability = 0
}: Props) => {
    return (
        <Main>
            <ForecastIcon icon="rain" />
            <Text>{`${precipProbability}%`}</Text>
        </Main>
    )
}

export default CurrentPrecip