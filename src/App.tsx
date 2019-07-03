import React from 'react';
import './App.css';
import styled from 'styled-components'

import Graph from './components/Graph'
import SevenDayForecast from './components/SevenDayForecast'

const Container = styled.div`
  width: 100%;
  height: 100vh;

`

const App: React.FC = () => {

  return (
    <div className="App">
      <Container>
        <SevenDayForecast />
        <Graph />
      </Container>
    </div>
  );
}

export default App;
