import axios from "axios";


const api = axios.create({
    baseURL: `http://localhost:5000`
})

export const uploadActivity = async (payload: FormData) => {
    return await api.post("/api/activity/upload",payload)
}

