import React from 'react'
import styled from 'styled-components'
import { scaleLinear } from 'd3-scale'
import { interpolateRgbBasis } from 'd3-interpolate'

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
    border-width: .3em;
    border-style: solid;
    border-color: ${props => props.color};
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
    color: ${props => props.color};
    
    @media (max-width: 600px) {
        font-size: 1.5em;
    }
`

const ApparentTemp = styled.div`
    @media (max-width: 600px) {
        font-size: 0.8em;
    }
`

const ApparentTempText = styled.span`
    color: ${p => p.color};
    font-weight: bold;
`

const DEGREES = "°"

const CurrentTemperature = ({temperature = 0, apparentTemperature = 0}: Props) => {

    const scale = scaleLinear().domain([0, 100])
    const tempNumber = scale(temperature)
    const apparentTempNumber = scale(apparentTemperature)
    const interpolator = interpolateRgbBasis(['blue', 'green', 'goldenrod', 'red'])
    const tempColor = interpolator(tempNumber)

    const apparentTempColor = interpolator(apparentTempNumber)
    
    return (
        <Main>
            <Container color={tempColor}>
                <Temp color={tempColor}>{`${Math.round(temperature)}${DEGREES}`}</Temp>
            </Container>
            <ApparentTemp>
                {'FEELS LIKE '}
                <ApparentTempText color={apparentTempColor}>{`${Math.round(apparentTemperature)}${DEGREES}`}</ApparentTempText>

            </ApparentTemp>
        </Main>
    )
}

export default CurrentTemperature