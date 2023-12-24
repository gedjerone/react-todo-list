import { useGetTodo } from '../hooks/useGetTodo.js'
import { Link, useParams } from 'react-router-dom'
import {
    Button,
    ButtonGroup,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Skeleton,
    Text,
    Tooltip
} from '@chakra-ui/react'
import {
    ArrowBackIcon,
    CheckCircleIcon,
    DeleteIcon,
    EditIcon,
    SmallCloseIcon
} from '@chakra-ui/icons'
import { useRef, useState } from 'react'
import { useDeleteTodo } from '../hooks/useDeleteTodo.js'
import { usePatchTodo } from '../hooks/usePatchTodo.js'

export const CurrentTodoPage = () => {
    const params = useParams()
    const [editable, setEditable] = useState(false)
    const { todo, isLoading, setQuery } = useGetTodo(params.id)
    const { editTodo, isEdit } = usePatchTodo()
    const focus = useRef(null)
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
        editTodo({
            id: params.id,
            field: 'title',
            value: focus.current.value
        })
        setQuery(`todo@update=${params.id}`)
    }

    const handleComplete = (value) => {
        editTodo({
            id: params.id,
            field: 'completed',
            value: value
        })
        setQuery(`todo@update=${params.id}`)
    }

    const handleDelete = async () => {
        setId(params.id)
    }

    return (
        <>
            <Flex className="p-4 flex-col items-start justify-center gap-8 max-w-4xl mx-auto">
                <Flex className="justify-between w-full items-center">
                    <Link to="/">
                        <Button
                            leftIcon={<ArrowBackIcon />}
                            variant="transparent"
                        >
                            Back
                        </Button>
                    </Link>
                    <ButtonGroup size="sm" isAttached variant="outline">
                        {todo.completed ? (
                            <Button
                                leftIcon={<CheckCircleIcon />}
                                color="teal"
                                onClick={() => handleComplete(!todo.completed)}
                            >
                                Complete
                            </Button>
                        ) : (
                            <Button
                                leftIcon={<SmallCloseIcon />}
                                color="pink"
                                onClick={() => handleComplete(!todo.completed)}
                            >
                                Uncomplete
                            </Button>
                        )}
                        <Button
                            leftIcon={<EditIcon />}
                            onClick={() => handleEdit(!editable)}
                        >
                            Edit
                        </Button>
                        <Button
                            leftIcon={<DeleteIcon />}
                            onClick={() => handleDelete()}
                        >
                            Delete
                        </Button>
                    </ButtonGroup>
                </Flex>
                <Flex className="flex-col items-start justify-center gap-4 ml-4">
                    <Skeleton isLoaded={!isEdit}>
                        {editable ? (
                            <InputGroup>
                                <Input placeholder={todo.title} ref={focus} />
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
                            <Text as="h3" fontSize="24px" noOfLines={1}>
                                {todo.title}
                            </Text>
                        )}
                        <Text>{todo?.description}</Text>
                    </Skeleton>
                </Flex>
            </Flex>
        </>
    )
}
