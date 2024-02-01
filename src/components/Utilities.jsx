import { useEffect, useState } from 'react'
import {
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Tooltip
} from '@chakra-ui/react'
import {
    MinusIcon,
    SearchIcon,
    TriangleDownIcon,
    TriangleUpIcon
} from '@chakra-ui/icons'
import { useDebounce } from '../hooks/useDebounce.js'
import { useDispatch } from "react-redux";
import { fetchTodos } from "../actions/index.js";

const sortedIcon = new Map([
    ['none', <MinusIcon key="none" />],
    ['asc', <TriangleUpIcon key="asc" />],
    ['desc', <TriangleDownIcon key="desc" />]
])

export const Utilities = () => {
    const [firstLoaded, setFirstLoaded] = useState(true);
    const [inputQuery, setInputQuery] = useState('')
    const debounceTimer = useDebounce(inputQuery, 500)
    const dispatch = useDispatch()
    const [sorted, setSorted] = useState('none')
    const handleSort = () => {
        if (sorted === 'none' || sorted === 'desc') {
            setSorted('asc')
            dispatch({
                type: 'SORT_TODOS',
                payload: 'asc'
            })
        }
        if (sorted === 'asc') {
            setSorted('desc')
            dispatch({
                type: 'SORT_TODOS',
                payload: 'desc'
            })
        }
    }
    const handleSearch = (value) => {
        setInputQuery(value)
    }
    useEffect(() => {
        if (!firstLoaded) {
            dispatch(fetchTodos(inputQuery))
        }
        firstLoaded && setFirstLoaded(false)
    }, [debounceTimer])

    return (
        <>
            <Flex className="mt-4 flex-row gap-2 items-center">
                <Tooltip label="Sort todos" openDelay={300} closeDelay={100}>
                    <IconButton
                        aria-label="Sort todos"
                        onClick={() => handleSort()}
                        size="sm"
                        icon={sortedIcon.get(sorted)}
                        colorScheme="blue"
                        variant="ghost"
                    />
                </Tooltip>
                <InputGroup size="md">
                    <Tooltip
                        label="Search todo"
                        openDelay={300}
                        closeDelay={100}
                    >
                        <Input
                            type="text"
                            placeholder="Enter todo title"
                            value={inputQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </Tooltip>
                    <InputRightElement className="mr-4" width="auto">
                        <SearchIcon />
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </>
    )
}