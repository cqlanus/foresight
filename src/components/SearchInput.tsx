import React, { useState } from 'react'
import { Input, InputOnChangeData, Form, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { Place } from '../types/location'

const FormContainer = styled(Form)`
    display: flex;
`

const StyledInput = styled(Input)`
    flex: 1;
`

interface Props {
    onSubmit: (term: string) => void,
    relocalize: () => void,
    place: Partial<Place>
}


const SearchInput = ({ onSubmit, relocalize, place = {} }: Props) => {

    const [ searchTerm, setSearchTerm ] = useState("")
    
    const handleChange = (e: React.ChangeEvent, data: InputOnChangeData) => setSearchTerm(data.value)
    
    const handleClick = () => {
        onSubmit(searchTerm)
    }
    
    return (
        <FormContainer onSubmit={handleClick}>
                <Button attached="left" onClick={relocalize} icon="location arrow" />
                <StyledInput value={searchTerm} placeholder="Search..." onChange={handleChange} />
                <Button attached="right" icon="search" type="submit" />
        </FormContainer>
            
    )
}

export default SearchInput