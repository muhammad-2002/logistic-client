import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDeliveryMen = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: deliveryMen = [], refetch } = useQuery({
    queryKey: ["delivery-man", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/delivery-man?role=deliveryMan&email=${user.email}`
      );
      return res.data;
    },
  });
  return [deliveryMen, refetch];
};

export default useDeliveryMen;
