import axios from "axios";
const axiosPublicSecure = axios.create({
  baseURL: "http://localhost:5000/",
});

const usePublicAxiosSecure = () => {
  return axiosPublicSecure;
};

export default usePublicAxiosSecure;
