import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../components/shared/CustomHook/useAuth";
import useAxiosSecure from "../../../components/shared/CustomHook/useAxiosSecure";
import HeadingComp from "../../../components/shared/HeadingComp/Headingcomp";

const MyRatings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const fetchReviews = async () => {
    const res = await axiosSecure.get(`/reviews/${user?.email}`);
    return res.data;
  };

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  return (
    <div className="text-black p-7 shadow-xl border">
      <div className="mb-6">
        <HeadingComp lightText={"My"} boldText={"Reviews"}></HeadingComp>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img
                src={review.userImage}
                alt={review.userName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{review.userName}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(review.reviewDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Rating: </span>
              <span>{review.rating} / 5</span>
            </div>
            <p className="text-gray-700">{review.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRatings;
