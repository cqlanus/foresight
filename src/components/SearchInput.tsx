import React, { useState, useEffect } from 'react'
import { Input, InputOnChangeData, Form, Button, Icon } from 'semantic-ui-react'
import { FaLocationArrow } from 'react-icons/fa'
import styled from 'styled-components'
import { Feature } from '../api';

const FormContainer = styled(Form)`
    display: flex;
`

const StyledInput = styled(Input)`
    flex: 1;
`

interface Props {
    onSubmit: (term: string) => void,
    relocalize: () => void,
    place: Partial<Feature>
}



const SearchInput = ({ onSubmit, relocalize, place = {} }: Props) => {


    const [ searchTerm, setSearchTerm ] = useState("")

    useEffect(() => {
        if (place.text && searchTerm !== place.text) {
            setSearchTerm(place.text)
        }
    }, [place])
    
    const handleChange = (e: React.ChangeEvent, data: InputOnChangeData) => setSearchTerm(data.value)
    
    const handleClick = () => {
        onSubmit(searchTerm)
    }
    
    return (
        <FormContainer onSubmit={handleClick}>
                <Button onClick={relocalize} icon="location arrow" />
                <StyledInput value={searchTerm} placeholder="Search..." onChange={handleChange} />
                <Button icon="search" />
        </FormContainer>
            
    )
}

export default SearchInput