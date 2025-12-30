import axios from "axios";
import type { EmissionBySourceData } from "@/types/emissions";


const api = axios.create({
    baseURL: ``
})

export const getEmissionsBySource = async (): Promise<EmissionBySourceData[]> => {
  const res = await api.get("/api/analytics/source");
  return res.data;
};
