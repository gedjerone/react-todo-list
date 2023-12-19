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
import PropTypes from 'prop-types'

const sortedIcon = new Map([
    ['none', <MinusIcon key="none" />],
    ['asc', <TriangleUpIcon key="asc" />],
    ['desc', <TriangleDownIcon key="desc" />]
])

export const Utilities = ({ setQuery, sorted, setSorted }) => {
    const [inputQuery, setInputQuery] = useState('')
    const debounceTimer = useDebounce(inputQuery, 500)

    const handleSort = () => {
        switch (sorted) {
            case 'none':
                setSorted('asc')
                break
            case 'asc':
                setSorted('desc')
                break
            case 'desc':
                setSorted('none')
                break
            default:
                break
        }
    }

    const handleSearch = (value) => {
        setInputQuery(value)
    }

    useEffect(() => {
        setQuery(inputQuery)
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

Utilities.propTypes = {
    setQuery: PropTypes.func.isRequired,
    sorted: PropTypes.string.isRequired,
    setSorted: PropTypes.func.isRequired
}
