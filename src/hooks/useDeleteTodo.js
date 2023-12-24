import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const useDeleteTodo = () => {
    const [id, setId] = useState({})
    const navigate = useNavigate()
    const [initial, setInitial] = useState(true)

    const deleteTodo = async () => {
        try {
            await axios.delete(`http://localhost:5500/todos/${id}`)
            navigate('/')
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
