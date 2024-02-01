import axios from "axios";
import {baseUrl, dbPort} from "../settings.js";

export const deleteTodo = (id) => async () => {
    try {
        await axios.delete(baseUrl + dbPort + `/todos/${id}`)
    } catch (err) {
        console.error(err.message)
    }
}