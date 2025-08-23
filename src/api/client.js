import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const api = axios.create({
  baseURL: `${BASE.replace(/\/+$/, "")}/api`, // हमेशा एक /api जोड़ो
  withCredentials: true,
});

export function setAuthToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}
