import { useEffect, useState } from 'react'
import { ref, update } from 'firebase/database'
import { db } from '../firebase.js'

export const usePatchTodo = () => {
    const [todo, setTodo] = useState({})
    const [initial, setInitial] = useState(true)

    useEffect(() => {
        const todoDbRef = ref(db, `todos/${todo.id}`)

        if (!initial) {
            update(todoDbRef, {
                [todo.field]: todo?.value
            })
        } else {
            setInitial(false)
        }
    }, [todo])

    return { setTodo }
}
