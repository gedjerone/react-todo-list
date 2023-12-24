import { Checkbox, Flex, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { usePatchTodo } from '../hooks/usePatchTodo.js'

export const Todo = ({ id, title, isCompleted, setQuery }) => {
    const { editTodo } = usePatchTodo()

    const handleComplete = (value) => {
        editTodo({
            id: id,
            field: 'completed',
            value: value
        })
        setQuery('@update')
    }

    return (
        <>
            <Flex id={id} className="items-center gap-4">
                <Checkbox
                    isChecked={isCompleted}
                    onChange={(e) => handleComplete(e.target.checked)}
                />
                <Link to={`/todos/` + id}>
                    <Text fontSize="xl" noOfLines={1}>
                        {title}
                    </Text>
                </Link>
            </Flex>
        </>
    )
}

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    setQuery: PropTypes.func.isRequired
}
