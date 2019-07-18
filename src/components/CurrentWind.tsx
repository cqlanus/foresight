import React from 'react'
import styled from 'styled-components'

import { ThemeContext } from '../context/theme'


interface ContainerProps {
    isDarkMode: boolean
}

interface Props {
    windSpeed: number
    windBearing: number
    windGust: number
}

const Main = styled.div`
    color: ${(p: ContainerProps) => p.isDarkMode ? 'white' : 'black'};
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: ${(props: Props) => `rotate(${props.windBearing}deg)`};
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    min-height: 8rem;
    min-width: 8rem;
`

const Circle = styled.div`
    display: flex;
    flex-direction: column;
    border: .2em solid;
    border-radius: 50%;
    height: 6rem;
    width: 6rem;

@media (max-width: 500px) {
    height: 5rem;
    width: 5rem;
}
`

const Triangle = styled.div`
    width: 0; 
    height: 0; 
    border-left: .5rem solid transparent;
    border-right: .5rem solid transparent;
    border-top: 1.5rem solid;
    position: absolute;
    top: 0.5rem;

    @media (max-width: 500px) {
        border-left: .3rem solid transparent;
        border-right: .3rem solid transparent;
        border-top: 1rem solid;
        top: 1rem;
    }
`

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
`

const Text = styled.p`
    text-align: center;
    
`

const Grid = styled.div`
    display: grid;
`

const WindCompass = ({windSpeed = 0,  windGust = 0, windBearing = 0}: Props) => {
    return (
        <Container windSpeed={windSpeed} windGust={windGust} windBearing={windBearing}>
            <Triangle/>
            <Circle/>
        </Container>
    )
}

const CurrentWind = ({windSpeed = 0,  windGust = 0, windBearing = 0}: Props) => {
    return (
        <ThemeContext.Consumer>

        {({ isDarkMode }) =>
            <Main isDarkMode={isDarkMode}>
                <Grid>
                    <WindCompass windSpeed={windSpeed} windGust={windGust} windBearing={windBearing}/>
                    <TextContainer>
                        <Text>{`${Math.round(windSpeed)} mph`}</Text>
                    </TextContainer>
                </Grid>
                <TextContainer>
                    <Text>{`Gusts ${Math.round(windGust)} mph`}</Text>
                </TextContainer>
            </Main>
        }
        </ThemeContext.Consumer>
    )
}

export default CurrentWind