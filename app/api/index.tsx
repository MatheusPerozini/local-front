import axios from "axios";

export const api = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  }
});
