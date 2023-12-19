import { useEffect, useState } from 'react'
import axios from 'axios'

export const usePatchTodo = () => {
    const [todo, setTodo] = useState({})
    const [initial, setInitial] = useState(true)

    const patchTodo = async () => {
        const data = { [todo?.field]: todo?.value }
        try {
            await axios.patch(`http://localhost:5500/todos/${todo.id}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
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
