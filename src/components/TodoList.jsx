import { Flex } from '@chakra-ui/react'
import {useDispatch, useSelector} from "react-redux";
import { Todo } from './Todo.jsx'
import {useEffect} from "react";
import {fetchTodos} from "../actions/index.js";

export const TodoList = () => {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)
    useEffect(() => {
        dispatch(fetchTodos())
    }, []);

    return (
        <>
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
        </>
    )
}