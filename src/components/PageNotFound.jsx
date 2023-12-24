import { Flex, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
    return (
        <>
            <Flex className="flex-row items-center justify-center mt-4">
                <Heading as="h3" fontSize={24} className="hover:text-blue-500">
                    <Link to={'/'}>Back to todos</Link>
                </Heading>
            </Flex>
            <Flex className="flex-row items-center justify-center m-32">
                <Heading as="h1" fontSize={160}>
                    404
                </Heading>
            </Flex>
        </>
    )
}
