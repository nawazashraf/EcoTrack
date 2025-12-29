import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:5000`
})

export const getTrends = async () => {
  const res = await api.get("/api/analytics/trends");
  return res.data;
};
