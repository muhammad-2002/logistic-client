import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    (req) => {
      const token = localStorage.getItem("accessToken");
      console.log(token);

      req.headers.Authorization = `Bearer ${token}`;
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const status = error.response.status;
      console.log(error);
      if (status === 401 || status === 403) {
        await logOutUser();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
