import axios from "axios";
import { baseUrl, dbPort } from '../settings.js'
export const fetchTodo = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(baseUrl + dbPort + `/todos?id=${id}`)
        dispatch({
            type: 'GET_TODO',
            payload: data
        })
    } catch (err) {
        console.error(err.message)
    }
}