import React, { useState } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import styled from 'styled-components'

import { getScentificDiscussion } from '../hooks/nws'

const DiscussionContainer = styled.div`
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const DiscussionParagraph = styled.p`
    font-size: 1.2em;
    line-height: 1.1em;
    max-width: 60ch;

`

interface ForecastDiscussion {
    "SHORT TERM"?: Array<string>,
    "LONG TERM"?: Array<string>,
    "AVIATION"?: Array<string>,
}

type DiscussionKeys = keyof ForecastDiscussion

interface DiscussionMap {
    [key: string]: DiscussionKeys
}

const DISCUSSION_MAP: DiscussionMap = {
    shortTerm: "SHORT TERM",
    longTerm: "LONG TERM",
}

const ForecastDiscussionModal = () => {

    const intitialState: ForecastDiscussion = {}
    const [discussion, setDiscussion] = useState(intitialState)
    const getData = async () => {
        if (Object.keys(discussion).length > 0) {
            return discussion
        }
        try {
            const response = await getScentificDiscussion()
            setDiscussion(response || {})
        } catch (error) {
            console.log({ error })
        }
    }

    const ModalButton = <Button onClick={getData} fluid>Get Scientific Discussion</Button>

    const renderDiscussion = (paragraphs: Array<string>, key: string) => {
        console.log({ paragraphs })
        return (
            <DiscussionContainer key={key}>
                <h3>{key}</h3>
                {
                    paragraphs.map((para, idx) => 
                        <DiscussionParagraph key={idx}>{para}</DiscussionParagraph>)
                }
            </DiscussionContainer>
        )
    }

    const discussionKeys: Array<DiscussionKeys> = Object.values(DISCUSSION_MAP)
    const hasDiscussion = (Object.keys(discussion).length > 0)

    console.log({ discussion })
    return (
        <Modal trigger={ModalButton}>
            <Modal.Header>Scientific Discussion</Modal.Header>
            <Modal.Content scrolling>
                {
                    hasDiscussion && discussionKeys.map((key: DiscussionKeys) => {
                        const discussionArray = discussion[key] || []
                        return renderDiscussion(discussionArray, key)
                    })
                }
            </Modal.Content>
        </Modal>
    )
}

export default ForecastDiscussionModal