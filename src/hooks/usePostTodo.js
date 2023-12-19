import { useEffect, useState } from 'react'
import { db } from '../firebase.js'
import { push, ref } from 'firebase/database'

export const usePostTodo = () => {
    const [todo, setTodo] = useState({})
    const [initial, setInitial] = useState(true)

    useEffect(() => {
        const todosDbRef = ref(db, 'todos')

        if (!initial) {
            push(todosDbRef, {
                title: todo.title,
                completed: todo.completed
            })
        } else {
            setInitial(false)
        }
    }, [todo])

    return { setTodo }
}
