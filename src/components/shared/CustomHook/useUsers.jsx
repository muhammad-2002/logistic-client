import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !loading && !!localStorage.getItem("accessToken"),
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res?.data;
    },
  });
  return [users, refetch];
};

export default useUsers;
