import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { TodosContext } from '../todos-context.js'

export const usePatchTodo = () => {
    const [todo, setTodo] = useState({})
    const [initial, setInitial] = useState(true)
    const { getTodos, query } = useContext(TodosContext)

    const patchTodo = async () => {
        const data = { [todo?.field]: todo?.value }
        try {
            await axios.patch(`http://localhost:5500/todos/${todo.id}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            getTodos(query)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!initial) {
            patchTodo()
        } else {
            setInitial(false)
        }
    }, [todo])

    return { setTodo }
}
