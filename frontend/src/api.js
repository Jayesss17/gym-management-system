import axios from "axios";

export const API = axios.create({
  baseURL: "https://gym-management-backend-wpfv.onrender.com/api"
});