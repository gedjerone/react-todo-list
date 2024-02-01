import axios from "axios";
import {baseUrl, dbPort} from "../settings.js";

export const postTodo = (todo) => async (dispatch) => {
    try {
        const { data } = await axios.post(baseUrl + dbPort + `/todos`, todo, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch({
            type: 'POST_TODO',
            payload: data
        })
    } catch (e) {
        console.error(e)
    }
}