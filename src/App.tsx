import React, { useState, useEffect, useReducer } from 'react';
import 'semantic-ui-css/semantic.min.css'
import "react-toggle/style.css"
import './App.css';
import styled from 'styled-components'
import Toggle from 'react-toggle'
import { WiDaySunny, WiMoonWaningCrescent4 } from 'react-icons/wi'

import Graph from './components/Graph'
import SevenDayForecast from './components/SevenDayForecast'
import UnitsModal from './components/UnitsModal'
import ForecastDiscussionModal from './components/ForecastDiscussionModal'
import Loader from './components/Loader'

import { getDarkSkyHourlyForecast } from './hooks/nws'
import { initialUnitsState, unitsReducer, UNITS_MAP, State } from './hooks/units'
import { getLocation } from './hooks/location'

interface ContainerProps {
  isDarkMode: boolean
}

const Container = styled.div`
  height: 100vh;
  border: 2px solid black;
  overflow: scroll;
  background-color: ${(props: ContainerProps) => props.isDarkMode ? 'dimgray' : 'white'};
  color: ${(props: ContainerProps) => props.isDarkMode ? 'white' : 'black'};
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #e0e1e2;

`

const ToggleContainer = styled.div`
  padding-right: 1em;
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
  const [ isDarkMode, setDarkMode ] = useState(false)

  const toggleDarkMode = () => setDarkMode(!isDarkMode)

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
        <Container isDarkMode={isDarkMode}>
          <TopBar>
            <UnitsModal handleClick={handleClick} selectedUnits={units} allUnits={UNITS_MAP} />
            <ToggleContainer>
              <Toggle 
                onChange={toggleDarkMode} 
                icons={{
                  checked: <WiDaySunny />,
                  unchecked: <WiMoonWaningCrescent4 fill={"#fff"} height={"20px"} width={"20px"}/>,
                }}
                defaultChecked={isDarkMode} />
            </ToggleContainer>
          </TopBar>
          <SevenDayForecast dailyData={dailyData} />
          <Graph units={units} dailyData={dailyData} hourlyData={hourlyData} />
          <ForecastDiscussionModal/>
        </Container>
      <Loader active={loading}/>
    </div>
  );
}

export default App;
