import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MapManager from '../hooks/maps'
import { Button } from 'semantic-ui-react'

const StyledMap = styled.div`
    height: 400px;
`

interface MapProps {
    coords: {
        latitude: number
        longitude: number
    }
}
const defaultCoords = {
    latitude: 41.8781,
    longitude: -87.6298,
}

const ForecastMap = ({ coords = defaultCoords }: MapProps) => {
    const MAP_ID = 'map'

    const initialManager: Partial<MapManager> = {}
    const [manager, setManager] = useState(initialManager)
    const handlePlay = () => manager.play && manager.play()
    const handlePause = () => manager.stop && manager.stop()
    
    useEffect(() => {
        const hasMap =
            manager.getMap && Object.keys(manager.getMap()).length > 0
        if (hasMap) {
            manager.setView && manager.setView(coords)
        } else {
            const manager = new MapManager(coords)
            // manager.getMap().setTarget(MAP_ID)

            setManager(manager)
        }
    }, [coords, handlePlay, manager])

    

    return (
        <div>
            <Button
icon="play"
onClick={handlePlay} />
            <Button
icon="pause"
onClick={handlePause} />
            <StyledMap id={MAP_ID} />
        </div>
    )
}

export default ForecastMap
