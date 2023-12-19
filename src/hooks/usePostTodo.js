import { useEffect, useState } from 'react'
import axios from 'axios'

export const usePostTodo = () => {
    const [todo, setTodo] = useState({})
    const [initial, setInitial] = useState(true)

    const postTodo = async () => {
        try {
            await axios.post(`http://localhost:5500/todos?title_like`, todo, {
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
            postTodo()
        } else {
            setInitial(false)
        }
    }, [todo])

    return { setTodo }
}
