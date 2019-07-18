import React from 'react'
import styled from 'styled-components'

import ForecastIcon from './ForecastIcon'

import { ThemeContext } from '../context/theme'

interface ContainerProps {
    isDarkMode: boolean
}

const IconContainer = styled.div`
    display: flex;  
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    grid-area: icon;
    flex-direction: column;
    justify-content: center;
    font-size: 6em;
    color: ${(p: ContainerProps) => p.isDarkMode ? 'lightgrey' : 'rgba(0,0,0,0.6)'};
    @media (max-width: 500px) {
        font-size: 5em;
        
    }
`

const TextContainer = styled.div`
    font-size: 1rem;
`


interface Props {
    icon: string,
    summary: string
}

const CurrentSummary = ({icon, summary}: Props) => {
    return (
        <ThemeContext.Consumer>

        {({isDarkMode}) =>
            <IconContainer isDarkMode={isDarkMode}>
                <ForecastIcon icon={icon} />
                <TextContainer>{summary}</TextContainer>
            </IconContainer>}
        </ThemeContext.Consumer>
    )
}

export default CurrentSummary