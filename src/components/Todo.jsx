import { Checkbox, Flex, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {useDispatch} from "react-redux";
import {patchTodo} from "../actions/index.js";

export const Todo = ({ id, title, isCompleted }) => {
    const dispatch = useDispatch()
    const handleComplete = (value) => {
        dispatch(patchTodo({
            id: id,
            completed: value
        }))
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
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
}
