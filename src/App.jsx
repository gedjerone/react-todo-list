import { TodoList } from './components/TodoList.jsx'
import { Utilities } from './components/Utilities.jsx'
import { Head } from './components/Head.jsx'
import { CreateNewTodoModal } from './components/CreateNewTodoModal.jsx'
import { useState } from 'react'

export const App = () => {
    const [isOpenModal, setOpenModal] = useState(false)

    return (
        <>
            <div className="px-4 py-8">
                <Head onOpenModal={setOpenModal} isOpen={isOpenModal} />
                <Utilities />
                <TodoList />
                <CreateNewTodoModal
                    onClose={setOpenModal}
                    isOpen={isOpenModal}
                />
            </div>
        </>
    )
}
