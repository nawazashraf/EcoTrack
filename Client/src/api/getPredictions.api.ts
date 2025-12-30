import axios from "axios";

const api = axios.create({
    baseURL: ``
})

export const getPrediction = async () => {
    const res = await api.get("/api/analytics/predict")
    return res.data
}

