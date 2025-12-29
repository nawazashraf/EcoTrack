import axios from "axios";


const api = axios.create({
    baseURL: `http://localhost:3000`
})

const submitActivity = async () => {
    return await api.post("/api/activity")
}

