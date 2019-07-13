import React from 'react'
import styled from 'styled-components'

interface Props {
    temperature: number
    apparentTemperature: number
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: .5em solid indianred;
    border-radius: 50%;
    height: 12em;
    width: 12em;
    @media (max-width: 400px) {
        height: 9em;
        width: 9em;
    }
`

const Temp = styled.div`
    font-size: 3em;
    margin-bottom: 0.5em;
    @media (max-width: 400px) {
        font-size: 2em;
    }
`

const ApparentTemp = styled.div`
    @media (max-width: 400px) {
        font-size: 0.8em;
    }
`

const DEGREES = "°"

const CurrentTemperature = ({temperature = 0, apparentTemperature = 0}: Props) => {
    
    return (
        <Container>
            <Temp>{`${Math.round(temperature)}${DEGREES}`}</Temp>
            <ApparentTemp>{`FEELS LIKE ${Math.round(apparentTemperature)}${DEGREES}`}</ApparentTemp>
        </Container>
    )
}

export default CurrentTemperature