import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components'

import Graph from './components/Graph'
import SevenDayForecast from './components/SevenDayForecast'
import UnitsModal from './components/UnitsModal'
import WunderLoader from './components/Loader'

import { getDarkSkyHourlyForecast } from './hooks/nws'
import { initialUnitsState, unitsReducer, UNITS_MAP, State } from './hooks/units'
import { getLocation } from './hooks/location'

const Container = styled.div`
  height: 100vh;
  border: 2px solid black;
  overflow: scroll;
`

const App: React.FC = () => {
  const [units, dispatch] = useReducer(unitsReducer, initialUnitsState)


  const setUnit = (key: string, value: string) => {
    return {
      type: "SET_UNIT",
      payload: { key, value }
    }
  }
  const initial: any = {}
  const [forecast, setForecast] = useState(initial)
  const [ loading, setLoading ] = useState(false)

  const getData = async () => {
    try {
      setLoading(true)
      const position = await getLocation()
      const darkSkyData = await getDarkSkyHourlyForecast(position)
      console.log({ darkSkyData })

      setForecast(darkSkyData)
    } catch (error) {
      console.log({ error })
    }
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])


  const { daily = {}, hourly = {} } = forecast
  const { data: dailyData = [] } = daily
  const { data: hourlyData = [] } = hourly

  const handleClick = (key: keyof State, value: string) => () => {
    dispatch(setUnit(key, value))
  }

  return (
    <div className="App">
        <Container>
          <UnitsModal handleClick={handleClick} selectedUnits={units} allUnits={UNITS_MAP} />
          <SevenDayForecast dailyData={dailyData} />
          <Graph units={units} dailyData={dailyData} hourlyData={hourlyData} />
        </Container>
      <WunderLoader active={loading}/>
    </div>
  );
}

export default App;
