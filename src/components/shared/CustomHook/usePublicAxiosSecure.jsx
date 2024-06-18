import axios from "axios";
const axiosPublicSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const usePublicAxiosSecure = () => {
  return axiosPublicSecure;
};

export default usePublicAxiosSecure;
