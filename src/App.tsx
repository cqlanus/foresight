import React, { useState, useEffect, useReducer } from 'react';
import 'semantic-ui-css/semantic.min.css'
import "react-toggle/style.css"
import 'ol/ol.css';
import './App.css';
import styled from 'styled-components'
import Toggle from 'react-toggle'
import { WiDaySunny, WiMoonWaningCrescent4 } from 'react-icons/wi'

import Graph from './components/Graph'
import SevenDayForecast from './components/SevenDayForecast'
import UnitsModal from './components/UnitsModal'
import ForecastDiscussionModal from './components/ForecastDiscussionModal'
import Loader from './components/Loader'
import SearchInput from './components/SearchInput'
import ForecastMap from './components/ForecastMap'
import CurrentConditions from './components/CurrentConditions'

import { getDarkSkyHourlyForecast } from './hooks/nws'
import { initialUnitsState, unitsReducer, UNITS_MAP, State } from './hooks/units'
import { getLocation, getCoordinates, getPlace } from './hooks/location'

interface ContainerProps {
    isDarkMode: boolean
}

const Container = styled.div`
    height: 100vh;
    overflow: scroll;
    background-color: ${(props: ContainerProps) => props.isDarkMode ? 'dimgray' : 'white'};
    color: ${(props: ContainerProps) => props.isDarkMode ? 'white' : 'black'};
`

const TopBar = styled.div`
    display: flex;
    align-items: center;

`

const SearchContainer = styled.div`
    flex-grow: 1;
`

const ToggleContainer = styled.div`
    margin: 0 1em;
`

// const MapContainer = styled.div`
//     height: 400px;
//     width: 100%;
// `

const App: React.FC = () => {
    const [units, dispatch] = useReducer(unitsReducer, initialUnitsState)

    const setUnit = (key: string, value: string) => {
        return {
            type: "SET_UNIT",
            payload: { key, value }
        }
    }
    const initial: any = {}
    const [ forecast, setForecast ] = useState(initial)
    const [ loading, setLoading ] = useState(false)
    const [ isDarkMode, setDarkMode ] = useState(false)
    const [ location, setLocation ] = useState(initial)
    const [ place, setPlace ] = useState(initial)

    const toggleDarkMode = () => setDarkMode(!isDarkMode)

    const getData = async () => {
        try {
            setLoading(true)
            const position = await getLocation()
            setLocation(position)
            const placeObject = await getPlace(position.coords)
            setPlace(placeObject)
            const darkSkyData = await getDarkSkyHourlyForecast(position)

            setForecast(darkSkyData)
        } catch (error) {
            console.log({ error })
        }
          setLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])


    const { daily = {}, hourly = {}, currently = {} } = forecast
    const { data: dailyData = [] } = daily
    const { data: hourlyData = [] } = hourly

    const handleClick = (key: keyof State, value: string) => () => {
        dispatch(setUnit(key, value))
    }

    const handleSearch = async (searchTerm: string) => {
        try {
            setLoading(true)
            const position = await getCoordinates(searchTerm)
            setLocation(position)
            const placeObject = await getPlace(position.coords)
            setPlace(placeObject)
            const darkSkyData = await getDarkSkyHourlyForecast(position)
            setForecast(darkSkyData)
        } catch (error) {
            console.log({error})
        }

        setLoading(false)
    }

    const renderTopBar = () => (
      <TopBar>
          <ToggleContainer>
              <Toggle 
                onChange={toggleDarkMode} 
                icons={{
                    checked: <WiDaySunny />,
                    unchecked: <WiMoonWaningCrescent4 fill={"#fff"} height={"20px"} width={"20px"}/>,
                }}
                defaultChecked={isDarkMode} />
          </ToggleContainer>
          <SearchContainer>
              <SearchInput place={place} relocalize={getData} onSubmit={handleSearch} />
          </SearchContainer>

      </TopBar>
    )

    const renderBottomBar = () => (
        <TopBar>
              <UnitsModal handleClick={handleClick} selectedUnits={units} allUnits={UNITS_MAP} />
              <ForecastDiscussionModal/>

        </TopBar>
    )

    return (
        <div className="App">
            <Container isDarkMode={isDarkMode}>
                {renderTopBar()}
                <CurrentConditions currentlyData={currently} />
                <SevenDayForecast dailyData={dailyData} />
                <Graph units={units} dailyData={dailyData} hourlyData={hourlyData} />
                    <ForecastMap coords={location.coords}/>
                {renderBottomBar()}
            </Container>
          <Loader active={loading}/>
        </div>
    );
}

export default App;
