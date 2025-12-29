import axios from "axios";
import type { EmissionBySource } from "@/types/emissions";


const api = axios.create({
    baseURL: `http://localhost:5000`
})

export const getEmissionsBySource = async (): Promise<EmissionBySource[]> => {
  const res = await api.get("/api/analytics/source");
  return res.data;
};
