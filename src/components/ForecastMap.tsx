import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MapManager from '../hooks/maps'
import { Button, Dropdown } from 'semantic-ui-react'
import { LAYER_MAPPING } from '../constants/maps'

const StyledMap = styled.div`
    height: 400px;
`

const StyledGroup = styled(Button.Group)`
    display: flex;
    flex-wrap: wrap;
`

interface MapProps {
    location: {
        bbox: number[]
        coords: {
            latitude: number
            longitude: number
        }
    }
}
const defaultCoords = {
    latitude: 41.8781,
    longitude: -87.6298,
}

const ForecastMap = ({ location }: MapProps) => {
    const { coords = defaultCoords, bbox } = location
    const MAP_ID = 'map'

    const initialManager: Partial<MapManager> = {}
    const [manager, setManager] = useState(initialManager)
    const [currentLayer, setLayer] = useState('radar')

    useEffect(() => {
        const hasMap =
            manager.getMap && Object.keys(manager.getMap()).length > 0
        if (hasMap) {
            manager.setView && manager.setView(coords)
        } else {
            const manager = new MapManager(coords, bbox, MAP_ID)
            setManager(manager)
        }
    }, [coords, manager, bbox])

    const handleLayerSelect = (layer: any) => () => {
        if (manager.selectLayer) {
            manager.selectLayer(layer)
            setLayer(layer.id)
        }
    }

    const isSelected = (id: string) => currentLayer === id

    const renderButtons = () => (
        <StyledGroup fluid>
            {
                Object.values(LAYER_MAPPING).map((layer) => {
                    const selected = isSelected(layer.id)
                    if (Array.isArray(layer.layers)) {
                        return (
                            <Dropdown key={layer.id} as={Button} active={selected} text={layer.name} >
                                <Dropdown.Menu>
                                    {
                                        layer.layers.map(l => (
                                            <Dropdown.Item key={l.id} text={l.name} onClick={handleLayerSelect({ ...layer, layers: l.id })} />
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        )
                    } else {
                        return <Button active={selected} key={layer.id} onClick={handleLayerSelect(layer)} >{layer.name}</Button>
                    }
                })
            }

        </StyledGroup>
    )

    return (
        <div>
            {renderButtons()}
            <StyledMap id={MAP_ID} />
        </div>
    )
}

export default ForecastMap
