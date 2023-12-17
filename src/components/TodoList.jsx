import { Flex } from '@chakra-ui/react'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { Todo } from './Todo.jsx'

export const TodoList = () => {
    const todoReducer = (prevState, action) => {
        switch (action.type) {
            case 'FETCH':
                return [...action.payload]
            case 'ADD':
                return [...prevState, action?.payload]
            case 'DELETE':
                return [...prevState].reduce((prev, curr) => {
                    prev =
                        curr?.id === action?.payload?.id
                            ? [...prev]
                            : [...prev, curr]
                    return prev
                }, [])
            case 'EDIT':
                console.log(action?.payload)
                return [...prevState].reduce((prev, curr) => {
                    prev =
                        curr?.id === action?.payload?.id
                            ? [...prev, action?.payload]
                            : [...prev, curr]
                    return prev
                }, [])
            default:
                break
        }
    }

    const [todosState, dispatch] = useReducer(todoReducer, [])

    const fetchTodos = (todos) => {
        dispatch({
            type: 'FETCH',
            payload: todos
        })
    }

    const editTodo = (todo) => {
        dispatch({
            type: 'EDIT',
            payload: todo
        })
    }

    const getTodos = async () => {
        try {
            const { data } = await axios.get(
                'https://jsonplaceholder.typicode.com/todos?userId=1'
            )
            return data
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTodos().then((data) => fetchTodos(data))
    }, [])

    return (
        <>
            <Flex className="flex-col gap-2 mt-4">
                {todosState.map((todo) => {
                    return (
                        <Todo
                            key={todo?.id}
                            id={todo?.id}
                            title={todo?.title}
                            isCompleted={todo?.completed}
                            editTodo={editTodo}
                        />
                    )
                })}
            </Flex>
        </>
    )
}
