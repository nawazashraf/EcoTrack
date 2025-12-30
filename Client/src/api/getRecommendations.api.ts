import axios from "axios";

const api = axios.create({
    baseURL: ``
});

export const getRecommendation = async () => {
  const res = await api.get("/api/analytics/recommendations");
  return res.data;
};
