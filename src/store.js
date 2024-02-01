import {applyMiddleware, compose, legacy_createStore as createStore} from "redux";
import {thunk} from "redux-thunk";
import {sortTitle} from "./helpers/sortByTitle.js";

export const initialState = {
    todos: [],
    query: ''
}

const todos = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return {
                ...state,
                todos: [...action.payload]
            }
        case 'GET_TODO':
            return {
                ...state,
                todos: action.payload
            }
        case 'PATCH_TODO':
            return {
                ...state,
                todos: state.todos.reduce((acc, val) => {
                    if (val.id === action.payload.id) {
                       return [...acc, action.payload]
                    }
                    return [...acc, val]
                }, [])
            }
        case 'POST_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case 'SORT_TODOS':
            return {
                ...state,
                todos: state.todos.reduce(() => {
                    if (action.payload === 'asc') {
                        return [...state.todos].sort((a, b) => sortTitle(a, b))
                    }
                    if (action.payload === 'desc') {
                        return [...state.todos].sort((a, b) => sortTitle(b, a))
                    }
                    return [...state.todos]
                }, [])
            }
        default:
            return state
    }
}

const composeEnhancers = window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(todos, composeEnhancers(applyMiddleware(thunk)))