// src/api/client.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
// Ensure no trailing slashes that can create `//auth/login` issues
const baseURL = BASE.replace(/\/+$/, "");

export const api = axios.create({baseURL: `${import.meta.env.VITE_API_URL}/api`, // always append /api here
  withCredentials: true,
});

export function setAuthToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}
