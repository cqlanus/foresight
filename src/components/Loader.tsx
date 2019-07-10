import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface Props {
    active: boolean
}
const WunderLoader = ({active}: Props) => (
    <Dimmer active={active}>
        <Loader/>
    </Dimmer>
)

export default WunderLoader