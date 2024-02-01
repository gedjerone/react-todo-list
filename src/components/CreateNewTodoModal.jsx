import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import { useDispatch } from "react-redux";
import { postTodo } from "../actions/index.js";

export const CreateNewTodoModal = ({ isOpen, onClose }) => {
    const newTodo = useRef('')
    const dispatch = useDispatch()
    const handleSubmit = (value) => {
        dispatch(postTodo({
            id: `${Date.now()}`,
            title: value,
            completed: false
        }))
        onClose(!isOpen)
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose(!isOpen)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add todo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            type="text"
                            placeholder="Enter todo title"
                            ref={newTodo}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            onClick={() => handleSubmit(newTodo.current.value)}
                        >
                            Add todo
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

CreateNewTodoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}
