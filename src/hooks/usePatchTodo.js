import { useEffect, useState } from 'react'
import axios from 'axios'

export const usePatchTodo = () => {
    const [todo, editTodo] = useState({})
    const [initial, setInitial] = useState(true)
    const [isEdit, setIsEdit] = useState(false)

    const patchTodo = async () => {
        const data = { [todo?.field]: todo?.value }
        try {
            await axios.patch(`http://localhost:5500/todos/${todo.id}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setIsEdit(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!initial) {
            setIsEdit(true)
            patchTodo()
        } else {
            setInitial(false)
        }
    }, [todo])

    return { editTodo, isEdit }
}
