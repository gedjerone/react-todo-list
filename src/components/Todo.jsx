import { Checkbox, Flex, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'

export const Todo = ({ id, title, isCompleted, editTodo }) => {
    return (
        <>
            <Flex id={id} className="items-center gap-4">
                <Checkbox
                    isChecked={isCompleted}
                    onChange={(event) =>
                        editTodo({
                            id: id,
                            title: title,
                            completed: event.target.checked
                        })
                    }
                />
                <Text fontSize="xl" noOfLines={1}>
                    {title}
                </Text>
            </Flex>
        </>
    )
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    editTodo: PropTypes.func.isRequired
}
