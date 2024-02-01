import axios from "axios";
import {baseUrl, dbPort} from "../settings.js";

export const patchTodo = (todo) => async (dispatch) => {
    try {
        const { data } = await axios.patch(baseUrl + dbPort + `/todos/${todo?.id}`, todo, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch({
            type: 'PATCH_TODO',
            payload: data
        })
    } catch (err) {
        console.error(err.message)
    }
}