import { Flex, Skeleton } from '@chakra-ui/react'
import { Todo } from './Todo.jsx'
import PropTypes from 'prop-types'

export const TodoList = ({ isLoading, todos }) => {
    return (
        <>
            <Skeleton isLoaded={!isLoading} height="120px" fadeDuration={1}>
                <Flex className="flex-col gap-2 mt-4">
                    {todos.map((todo) => {
                        if (todo && typeof todo !== 'undefined') {
                            return (
                                <Todo
                                    key={todo.id}
                                    id={todo.id}
                                    title={todo?.title}
                                    isCompleted={todo?.completed}
                                />
                            )
                        }
                    })}
                </Flex>
            </Skeleton>
        </>
    )
}

TodoList.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    todos: PropTypes.array.isRequired
}
