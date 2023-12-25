import { useEffect, useState } from 'react'
import axios from 'axios'

export const useGetTodos = (limit = 100) => {
    const [todos, setTodos] = useState([])
    const [sorted, setSorted] = useState('none')
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const getTodos = async (queryString) => {
        try {
            const { data } = await axios.get(
                `http://localhost:5500/todos?title_like=${queryString}&limit=${limit}`
            )
            setTodos(data.reverse())
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const sortTitle = (a, b) => {
        if (a.title < b.title) {
            return -1
        }
        if (a.title > b.title) {
            return 1
        }
        return 0
    }

    const sortedTodos = () => {
        if (sorted === 'asc') {
            return [...todos].sort((a, b) => sortTitle(a, b))
        }
        if (sorted === 'desc') {
            return [...todos].sort((a, b) => sortTitle(b, a))
        }
        return [...todos]
    }

    useEffect(() => {
        setIsLoading(true)
        getTodos(query)
    }, [query, limit])

    return {
        todos: sortedTodos(),
        getTodos,
        isLoading,
        query,
        setQuery,
        sorted,
        setSorted
    }
}
