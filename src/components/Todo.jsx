import {
    Checkbox,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Spacer,
    Text,
    Tooltip
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { CheckCircleIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useRef, useState } from 'react'
import { usePatchTodo } from '../hooks/usePatchTodo.js'
import { useDeleteTodo } from '../hooks/useDeleteTodo.js'

export const Todo = ({ id, title, isCompleted, setQuery }) => {
    const [editable, setEditable] = useState(false)
    const focus = useRef(null)
    const { setTodo } = usePatchTodo()
    const { setId } = useDeleteTodo()

    const handleEdit = (currState) => {
        if (currState) {
            setEditable(currState)
            setTimeout(() => focus.current && focus.current.focus())
        } else {
            setEditable(currState)
        }
    }

    const handleSave = () => {
        setEditable(!editable)
        setTodo({
            id: id,
            field: 'title',
            value: focus.current.value
        })
        setQuery('@update')
    }

    const handleComplete = (value) => {
        setTodo({
            id: id,
            field: 'completed',
            value: value
        })
        setQuery('@update')
    }

    const handleDelete = () => {
        setId(id)
        setQuery('@update')
    }

    return (
        <>
            <Flex id={id} className="items-center gap-4">
                <Checkbox
                    isChecked={isCompleted}
                    onChange={(e) => handleComplete(e.target.checked)}
                />
                {editable ? (
                    <InputGroup>
                        <Input placeholder={title} ref={focus} />
                        <InputRightElement>
                            <Tooltip
                                label="Save todo"
                                openDelay={300}
                                closeDelay={100}
                            >
                                <IconButton
                                    aria-label="Save todo"
                                    variant=""
                                    size="sm"
                                    icon={<CheckCircleIcon />}
                                    onClick={() => handleSave()}
                                />
                            </Tooltip>
                        </InputRightElement>
                    </InputGroup>
                ) : (
                    <Text fontSize="xl" noOfLines={1}>
                        {title}
                    </Text>
                )}
                <Spacer />
                <Tooltip label="Edit todo" openDelay={300} closeDelay={100}>
                    <IconButton
                        aria-label="Edit todo"
                        variant=""
                        size="sm"
                        icon={<EditIcon />}
                        onClick={() => handleEdit(!editable)}
                    />
                </Tooltip>
                <Tooltip label="Delete todo" openDelay={300} closeDelay={100}>
                    <IconButton
                        aria-label="Delete todo"
                        variant=""
                        size="sm"
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete()}
                    />
                </Tooltip>
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
