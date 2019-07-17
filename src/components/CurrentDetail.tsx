import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 0 1em;
`

const Title = styled.p`
    font-weight: bold;
    margin: 0 1ch 0 0;
`

const DetailContainer = styled.span`
    background-color: ${p => p.color};
    padding: .1rem .3rem;
    border-radius: .1rem;
    color: ${p => p.color ? '#fff' : '#000'};
    font-weight: ${p => p.color ? 'bold' : 'none'};
`

const Detail = styled.p`
`

interface Props {
    detail: number,
    title: string,
    units: string,
    sigfigs?: number,
    background?: string,
}

const CurrentDetail = ({ detail = 0, title = "", units = "", sigfigs = 3, background }: Props) => {
    return (
        <Container>
            <Title>{`${title}:`}</Title>
            <DetailContainer color={background} >

                <Detail >{`${detail.toPrecision(sigfigs)}${units}`}</Detail>
            </DetailContainer>
        </Container>
    )
}

export default CurrentDetail