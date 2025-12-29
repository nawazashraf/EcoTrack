import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:5000`,
});

export const getRecommendation = async () => {
  const res = await api.get("/api/analytics/recommendations");
  return res.data;
};
