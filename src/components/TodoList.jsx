import { Flex, Skeleton } from '@chakra-ui/react'
import { Todo } from './Todo.jsx'
import { useContext } from 'react'
import { TodosContext } from '../todos-context.js'

export const TodoList = () => {
    const { todos, isLoading } = useContext(TodosContext)

    return (
        <>
            <Skeleton isLoaded={!isLoading} height="120px" fadeDuration={1}>
                <Flex className="flex-col gap-2 mt-4">
                    {todos.map((todo) => {
                        return (
                            <Todo
                                key={todo?.id}
                                id={todo?.id}
                                title={todo?.title}
                                isCompleted={todo?.completed}
                            />
                        )
                    })}
                </Flex>
            </Skeleton>
        </>
    )
}
