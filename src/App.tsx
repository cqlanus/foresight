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

  const initial: any = {}
  const [forecast, setForecast] = useState(initial)

  const getData = async () => {
    try {
      const darkSkyData: {
        daily: {
          data: any
        }
      } = await getDarkSkyHourlyForecast()
      console.log({ darkSkyData })
      setForecast(darkSkyData)
    } catch (error) {
      console.log({ error })
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const { daily = {}, hourly = {} } = forecast
  const { data: dailyData = [] } = daily
  const { data: hourlyData = [] } = hourly

  return (
    <div className="App">
      <Container>
        <SevenDayForecast dailyData={dailyData} />
        <Graph dailyData={dailyData} hourlyData={hourlyData} />
      </Container>
    </div>
  );
}

export default App;
