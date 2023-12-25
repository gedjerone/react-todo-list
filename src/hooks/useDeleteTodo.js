import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { TodosContext } from '../todos-context.js'

export const useDeleteTodo = () => {
    const [id, setId] = useState({})
    const [initial, setInitial] = useState(true)
    const { getTodos, query } = useContext(TodosContext)

    const deleteTodo = async () => {
        try {
            await axios.delete(`http://localhost:5500/todos/${id}`)
            getTodos(query)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!initial) {
            deleteTodo()
        } else {
            setInitial(false)
        }
    }, [id])

    return { setId }
}
