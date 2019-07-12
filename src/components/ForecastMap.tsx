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

    console.log({coords})
    const MAP_ID = "map"

    const initial: Partial<Map> = {}
    const [ map, setMap ] = useState(initial)
    
    useEffect(() => {
        if (Object.keys(map).length > 0) { 
            setNewView(map, coords)
         } else {
             const m = createMap(coords)
             m.setTarget(MAP_ID)
     
             setMap(m)
         }
    }, [coords])
    
    return (
        // <StyledMap center={[latitude, longitude]} zoom={zoom} >
        //     <TileLayer
        //     attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
        //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //     />
        //     {/* <WMSTileLayer
        //     layers={"17"}
        //     url="https://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_rtma_time/MapServer/WMSServer"
        //     transparent={true}
        //     version={"1.3.0"}
        //     format={"image/png"}
        //     /> */}
            
        // </StyledMap>
        <StyledMap id={MAP_ID} />
        )
}

export default ForecastMap