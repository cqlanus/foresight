import React from 'react'
import { Button, Modal, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import { State, UnitsMap, ValueOfUnitsMap } from '../hooks/units'

const StyledModal = styled(Modal)`
    padding: 1em;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const ButtonGroup = styled.div`
    flex-basis: 45%;
    padding: 1em 0;
`

const ModalButton = <Button fluid color="grey">Customize</Button>

interface Props {
    selectedUnits: State
    allUnits: UnitsMap
    handleClick: (key: keyof State, value: string) => () => any
}

const UnitsModal = ({selectedUnits, allUnits, handleClick}: Props) => {

    const renderGroup = (name: string, items: Array<{ value: string, key: keyof State, selected: boolean}>) => {
        return (
            <ButtonGroup key={name}>
                <Modal.Actions>
                    <Header as={"h3"} color="grey">{name}</Header>
                    <Button.Group widths={4}>
                        {
                            items.map((item, idx) => 
                                <Button 
                                    onClick={handleClick(item.key, item.value)} 
                                    primary={item.selected} 
                                    fluid 
                                    key={idx}>{item.value}</Button>)
                        }
                    </Button.Group>
                </Modal.Actions>
            </ButtonGroup>
        )
    }

    const renderUnits = () => {
        return Object.values(allUnits).map((value: ValueOfUnitsMap) => {
            const currentSelected = selectedUnits[value.key]
            const values: Array<{ value: string, key: keyof State, selected: boolean}> = Object.values(value.units).map(val => {
                return {
                    value: val,
                    key: value.key,
                    selected: currentSelected === val
                }
            })
            return renderGroup(value.name, values)
        })
    }
    
    return (
        <StyledModal trigger={ModalButton}>

            <Modal.Header>Customize Units</Modal.Header>
            <Modal.Content>
                <ButtonContainer>
                    {renderUnits()}
                </ButtonContainer>
            </Modal.Content>
        </StyledModal>
    )
}

export default UnitsModal