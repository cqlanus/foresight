import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { getSevenDayForecast } from "../hooks/nws"

const Container = styled.div`
    display: flex;
`

const DayTileContainer = styled.div``


const SevenDayForecast = () => {
    const [sevenDay, setSevenDay] = useState([])

    const getData = () => {
        getSevenDayForecast(sevenDay)
            .then(setSevenDay)
            .catch(console.log)
    }

    useEffect(getData, [sevenDay])
    return (
        <Container>

        </Container>
    )
}