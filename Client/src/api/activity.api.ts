import type { ActivityForm } from "@/types/activity.types";
import axios from "axios";


const api = axios.create({
    baseURL: `http://localhost:5000`
})

export const submitActivity = async (payload: ActivityForm) => {
    return await api.post("/api/activity",payload)
}

