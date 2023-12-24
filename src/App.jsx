import { TodoList } from './components/TodoList.jsx'
import { Utilities } from './components/Utilities.jsx'
import { useGetTodos } from './hooks/useGetTodos.js'
import { Head } from './components/Head.jsx'
import { CreateNewTodoModal } from './components/CreateNewTodoModal.jsx'
import { useState } from 'react'

export const App = () => {
    const { todos, isLoading, setQuery, sorted, setSorted } = useGetTodos(100)

    const [isOpenModal, setOpenModal] = useState(false)

    return (
        <>
            <div className="px-4 py-8">
                <Head onOpenModal={setOpenModal} isOpen={isOpenModal} />
                <Utilities
                    setQuery={setQuery}
                    sorted={sorted}
                    setSorted={setSorted}
                />
                <TodoList
                    isLoading={isLoading}
                    todos={todos}
                    setQuery={setQuery}
                />
                <CreateNewTodoModal
                    onClose={setOpenModal}
                    isOpen={isOpenModal}
                    setQuery={setQuery}
                />
            </div>
        </>
    )
}
