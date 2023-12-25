import { TodoList } from './components/TodoList.jsx'
import { Utilities } from './components/Utilities.jsx'
import { useGetTodos } from './hooks/useGetTodos.js'
import { Head } from './components/Head.jsx'
import { CreateNewTodoModal } from './components/CreateNewTodoModal.jsx'
import { useState } from 'react'
import { TodosContext } from './todos-context.js'

export const App = () => {
    const { todos, getTodos, isLoading, query, setQuery, sorted, setSorted } =
        useGetTodos(100)

    const [isOpenModal, setOpenModal] = useState(false)

    return (
        <>
            <div className="px-4 py-8">
                <Head onOpenModal={setOpenModal} isOpen={isOpenModal} />
                <TodosContext.Provider
                    value={{
                        todos,
                        getTodos,
                        query,
                        isLoading
                    }}
                >
                    <Utilities
                        setQuery={setQuery}
                        sorted={sorted}
                        setSorted={setSorted}
                    />
                    <TodoList />
                    <CreateNewTodoModal
                        onClose={setOpenModal}
                        isOpen={isOpenModal}
                    />
                </TodosContext.Provider>
            </div>
        </>
    )
}
