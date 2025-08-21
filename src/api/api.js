import axios from "axios";

const apiUrl = "https://restcountries.com/v3.1";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
