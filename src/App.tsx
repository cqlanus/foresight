import React from 'react';
import './App.css';
import styled from 'styled-components'

import Graph from './components/Graph'

const Container = styled.div`
  width: 50%;

`

const App: React.FC = () => {

  return (
    <div className="App">
      <Graph /* width={600} height={400} */ />
    </div>
  );
}

export default App;
