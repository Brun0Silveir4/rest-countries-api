import axios from "axios";

const apiUrl = "https://restcountries.com/v3.1";

const firstApi = axios.create({
  baseURL: apiUrl,
});

const secondUrl = "https://restcountries.com/v2";

const secondApi = axios.create({
  baseURL: secondUrl,
});

export { firstApi, secondApi };
