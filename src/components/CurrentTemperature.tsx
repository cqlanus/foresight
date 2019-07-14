import React from 'react'
import styled from 'styled-components'

interface Props {
    temperature: number
    apparentTemperature: number
}

const Main = styled.div``

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: .3em solid indianred;
    border-radius: 50%;
    height: 8rem;
    width: 8rem;
    margin-bottom: 0.5em;
    /* width: 15vw;
    height: 15vw; */
    @media (max-width: 800px) {
        /* width: 20vw;
        height: 20vw; */
    }
`

const Temp = styled.div`
    font-size: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 600px) {
        font-size: 1.5em;
    }
`

const ApparentTemp = styled.div`
    @media (max-width: 600px) {
        font-size: 0.8em;
    }
`

const DEGREES = "°"

const CurrentTemperature = ({temperature = 0, apparentTemperature = 0}: Props) => {
    
    return (
        <Main>
            <Container>
                <Temp>{`${Math.round(temperature)}${DEGREES}`}</Temp>
            </Container>
            <ApparentTemp>{`FEELS LIKE ${Math.round(apparentTemperature)}${DEGREES}`}</ApparentTemp>
        </Main>
    )
}

export default CurrentTemperature