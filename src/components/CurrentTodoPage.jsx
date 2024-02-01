import {Link, useNavigate, useParams} from 'react-router-dom'
import {
    Button,
    ButtonGroup,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
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
import {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {patchTodo, fetchTodo, deleteTodo} from "../actions/index.js";

export const CurrentTodoPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [editable, setEditable] = useState(false)
    const focus = useRef(null)
    const dispatch = useDispatch()
    const todo = useSelector((state) => state.todos[0])
    const handleComplete = (value) => {
        dispatch(patchTodo({
            id: params.id,
            completed: value
        }))
    }
    const handleSave = () => {
        setEditable(!editable)
        dispatch(patchTodo({
            id: params.id,
            title: focus.current.value
        }))
    }
    const handleEdit = (currState) => {
        if (currState) {
            setEditable(currState)
            setTimeout(() => focus.current && focus.current.focus())
        } else {
            setEditable(currState)
        }
    }
    const handleDelete = async () => {
        dispatch(deleteTodo(params.id))
        navigate('/')
    }
    useEffect(() => {
        dispatch(fetchTodo(params.id))
    }, []);

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
                        {todo?.completed ? (
                            <Button
                                leftIcon={<CheckCircleIcon />}
                                color="teal"
                                onClick={() =>
                                    handleComplete(!todo?.completed)
                            }
                            >
                                Complete
                            </Button>
                        ) : (
                            <Button
                                leftIcon={<SmallCloseIcon />}
                                color="pink"
                                onClick={() =>
                                    handleComplete(!todo?.completed)
                            }
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
                    {editable ? (
                        <InputGroup>
                            <Input
                                placeholder={todo?.title}
                                ref={focus}
                            />
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
                            {todo?.title}
                        </Text>
                    )}
                    <Text>{todo?.description}</Text>
                </Flex>
            </Flex>
        </>
    )
}
