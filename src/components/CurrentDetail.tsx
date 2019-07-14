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

const Detail = styled.p`

`

interface Props {
    detail: number,
    title: string,
    units: string
}

const CurrentDetail = ({ detail = 0, title = "", units = "" }: Props) => {
    return (
        <Container>
            <Title>{`${title}:`}</Title>
            <Detail>{`${detail}${units}`}</Detail>
        </Container>
    )
}

export default CurrentDetail