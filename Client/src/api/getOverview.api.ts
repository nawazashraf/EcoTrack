import axios from "axios";
import type { AnalyticsOverview } from "@/types/analytics";

const api = axios.create({
    baseURL: `/`
})


export const getOverview = async (): Promise<AnalyticsOverview> => {
  const res = await api.get("/api/analytics/overview");
  return res.data;
};
