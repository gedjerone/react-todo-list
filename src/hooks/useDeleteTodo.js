import { useEffect, useState } from 'react'
import { ref, remove } from 'firebase/database'
import { db } from '../firebase.js'

export const useDeleteTodo = () => {
    const [id, setId] = useState(0)
    const [initial, setInitial] = useState(true)

    useEffect(() => {
        const todoDbRef = ref(db, `todos/${id}`)

        if (!initial) {
            remove(todoDbRef)
        } else {
            setInitial(false)
        }
    }, [id])

    return { setId }
}
