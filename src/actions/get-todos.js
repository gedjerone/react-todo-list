import axios from "axios";
import { baseUrl, dbPort } from '../settings.js'
export const fetchTodos = (query = '') => async (dispatch) => {
    try {
        const { data } = await axios.get(baseUrl + dbPort + `/todos?title_like=${query}`)
        dispatch({
            type: 'GET_TODOS',
            payload: data
        })
    } catch (err) {
        console.error(err.message)
    }
}