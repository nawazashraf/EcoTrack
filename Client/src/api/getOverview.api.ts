import axios from "axios";
import type { AnalyticsOverview } from "@/types/analytics";

const api = axios.create({
    baseURL: `http://localhost:5000`
})


export const getOverview = async (): Promise<AnalyticsOverview> => {
  const res = await api.get("/api/analytics/overview");
  return res.data;
};
