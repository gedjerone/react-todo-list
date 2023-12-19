import { useEffect, useState } from 'react'
import { db } from '../firebase.js'
import { onValue, ref } from 'firebase/database'

export const useGetTodos = () => {
    const [todos, setTodos] = useState([])
    const [sorted, setSorted] = useState('none')
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)

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
        const todosDbRef = ref(db, 'todos')

        return onValue(todosDbRef, (snapshot) => {
            const loadedTodos = Object.entries(snapshot.val()).reverse()
            const todosArray = loadedTodos.map((value) => {
                return {
                    id: value[0],
                    title: value[1].title,
                    completed: value[1].completed
                }
            })

            setTodos(
                todosArray.filter((e) => {
                    if (e && typeof e !== 'undefined') {
                        return e.title.includes(query)
                    }
                })
            )
            setIsLoading(false)
        })
    }, [query])

    return {
        todos: sortedTodos(),
        isLoading,
        setQuery,
        sorted,
        setSorted
    }
}
