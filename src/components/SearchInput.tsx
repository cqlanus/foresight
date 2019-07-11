import React, { useState } from 'react'
import { Input, InputOnChangeData, Form } from 'semantic-ui-react'

interface Props {
    onSubmit: (term: string) => void
}

const SearchInput = ({ onSubmit }: Props) => {

    const [ searchTerm, setSearchTerm ] = useState("")
    
    const handleChange = (e: React.ChangeEvent, data: InputOnChangeData) => setSearchTerm(data.value)
    
    const handleClick = () => onSubmit(searchTerm)
    
    return (
        <Form onSubmit={handleClick}>
            <Input onChange={handleChange} fluid action={{ icon: 'search' }} placeholder='Search...' />
        </Form>
    )
}

export default SearchInput