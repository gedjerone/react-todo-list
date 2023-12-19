import { Flex, Heading, IconButton, Tooltip } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'

export const Head = ({ isOpen, onOpenModal }) => {
    return (
        <>
            <Flex className="flex-row gap-4 items-center">
                <Heading as="h1">Todo List</Heading>
                <Tooltip label="Add todo" openDelay={300} closeDelay={100}>
                    <IconButton
                        aria-label="Add todo"
                        size="xs"
                        fontSize="12px"
                        icon={<AddIcon />}
                        colorScheme="blue"
                        isRound={true}
                        onClick={() => onOpenModal(!isOpen)}
                    />
                </Tooltip>
            </Flex>
        </>
    )
}

Head.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpenModal: PropTypes.func.isRequired
}
