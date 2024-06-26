import React from "react";
import useAuth from "../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "../../../components/shared/CustomHook/useAxiosSecure";
import useDeliveryMen from "../../../components/shared/CustomHook/useDeliveryMen";
import HeadingComp from "../../../components/shared/HeadingComp/Headingcomp";

const AllDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();
  // const [review, setReview] = useState([]);
  // useEffect(() => {
  //   const res = axiosSecure.get(`/reviews/${user?.email}`);
  //   setReview(res.data);
  // }, [user.email]);
  // console.log(review);
  const { user } = useAuth();
  const [deliveryMen, refetch] = useDeliveryMen();

  return (
    <div className="text-black p-7 shadow-xl border">
      <div className="mb-6">
        <HeadingComp lightText={"All"} boldText={"Delivery Men"}></HeadingComp>
      </div>
      <table className="min-w-full bg-white text-center">
        <thead>
          <tr>
            <th className="w-1/4 px-4 py-2">Delivery Man's Name</th>
            <th className="w-1/4 px-4 py-2">Phone Number</th>
            <th className="w-1/4 px-4 py-2">Number of Parcels Delivered</th>
            <th className="w-1/4 px-4 py-2">Average Review</th>
          </tr>
        </thead>
        <tbody>
          {deliveryMen.map((deliveryMan) => (
            <tr key={deliveryMan._id}>
              <td className="border px-4 py-2">{deliveryMan.name}</td>
              <td className="border px-4 py-2">{deliveryMan.phone}</td>
              <td className="border px-4 py-2">{deliveryMan.deliveryCount}</td>
              <td className="border px-4 py-2">{deliveryMan.averageRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDeliveryMan;
