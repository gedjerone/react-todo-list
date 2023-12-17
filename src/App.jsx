import { Heading } from '@chakra-ui/react'
import { TodoList } from './components/TodoList.jsx'

export const App = () => {
    return (
        <>
            <div className="px-4 py-8">
                <Heading as="h1">Todo List</Heading>
                <TodoList />
            </div>
        </>
    )
}
