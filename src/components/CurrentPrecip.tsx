import React from 'react'
import styled from 'styled-components'
import { FiDroplet } from 'react-icons/fi'

import { ThemeContext } from '../context/theme'

interface MainProps {
    isDarkMode: boolean
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    font-size: 4rem;
    color: ${(props: MainProps) => props.isDarkMode ? 'lightblue' : 'steelblue'};
`

const Text = styled.p`
    font-size: 2rem;
    text-align: center;
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
        <ThemeContext.Consumer>

        {({isDarkMode}) =>
            <Main isDarkMode={isDarkMode} >
                <FiDroplet />
                <Text>{`${(precipProbability * 100)}%`}</Text>
            </Main>}
        </ThemeContext.Consumer>
        
    )
}

export default CurrentPrecip