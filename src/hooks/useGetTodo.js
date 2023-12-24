import { useEffect, useState } from 'react'
import axios from 'axios'

export const useGetTodo = (id) => {
    const [todo, setTodo] = useState({})
    const [query, setQuery] = useState(id)
    const [isLoading, setIsLoading] = useState(false)

    const getTodo = async (queryString) => {
        try {
            const { data } = await axios.get(
                `http://localhost:5500/todos/${queryString}`
            )
            setTodo(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (query.includes('todo@update=')) {
            const taskId = query.split('=')[1]
            setIsLoading(true)
            getTodo(taskId)
            setQuery(taskId)
        } else {
            setIsLoading(true)
            getTodo(query)
        }
    }, [query])

    return {
        todo,
        isLoading,
        setQuery
    }
}
