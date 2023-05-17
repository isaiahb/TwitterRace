import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL + "/api";
axios.defaults.withCredentials = true;

const api = {
  twitter: {
    getStats: async (p1: string, p2: string) => {
      return (await axios.get("/twitter/race/" + "?p1=" + p1 + "&p2=" + p2)).data.stats
    },
  }
};

export default api;