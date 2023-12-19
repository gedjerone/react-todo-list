import { useEffect, useState } from 'react'
import axios from 'axios'

export const useDeleteTodo = () => {
    const [id, setId] = useState({})
    const [initial, setInitial] = useState(true)

    const deleteTodo = async () => {
        try {
            await axios.delete(`http://localhost:5500/todos/${id}`)
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
