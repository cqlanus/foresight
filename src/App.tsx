import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components'

import Graph from './components/Graph'
import SevenDayForecast from './components/SevenDayForecast'

import { getDarkSkyHourlyForecast } from './hooks/nws'

const Container = styled.div`
  width: 100%;
  height: 100vh;

`

const App: React.FC = () => {

  const [sevenDay, setSevenDay] = useState([])

  const getData = async () => {
    try {
      const darkSkyData: {
        daily: {
          data: any
        }
      } = await getDarkSkyHourlyForecast()
      console.log({ daily: darkSkyData.daily.data })
      setSevenDay(darkSkyData.daily.data)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <div className="App">
      <Container>
        <SevenDayForecast sevenDay={sevenDay} />
        <Graph sevenDay={sevenDay} />
      </Container>
    </div>
  );
}

export default App;
