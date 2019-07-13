import React, { useEffect, useState  } from 'react'
import {Map} from 'ol';
import styled from 'styled-components'
import { createMap, setNewView } from '../hooks/openLayers'

const StyledMap = styled.div`
    height: 400px;
`

interface MapProps {
    coords: {
        latitude: number,
        longitude: number
    },
}
const defaultCoords = {
    latitude: 41.8781,
    longitude: -87.6298
}

const ForecastMap = ({ coords = defaultCoords }: MapProps) => {

    const MAP_ID = "map"

    const initial: Partial<Map> = {}
    const [ map, setMap ] = useState(initial)

    const hasMap = Object.keys(map).length > 0
    
    useEffect(() => {
        if (hasMap) { 
            setNewView(map, coords)
         } else {
             const m = createMap(coords)
             m.setTarget(MAP_ID)
     
             setMap(m)
         }
    }, [coords, map, hasMap])
    
    return <StyledMap id={MAP_ID} />
}

export default ForecastMap