import axios from "axios";
import type { PerformanceComparison } from "@/types/comparison";


const api = axios.create({
    baseURL: `/`
})


export const getPerformanceComparison = async (): Promise<PerformanceComparison> => {
  const res = await api.get("/api/analytics/compare");
  return res.data;
};
