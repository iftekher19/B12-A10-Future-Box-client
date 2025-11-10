import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "../axios.config"; 

import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import SpotlightCard from "../Components/SpotlightCard"; 
import LoadingSpinner from "../Components/LoadingSpinner";

export default function AvailableFoods() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch available foods from server
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get("/foods");
        setFoods(data);
      } catch (err) {
        console.error(err);
        setError(err);
        toast.error("Failed to load available foods");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  // Redirect logic for "View Details"
  const handleViewDetails = (id) => {
    if (!user) {
      toast("Please login to view food details", { icon: "🔒" });
      return navigate("/login", {
        state: { from: { pathname: `/food/${id}` } },
      });
    }
    navigate(`/food/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-10">
      <toast position="top-center" />

      <h2 className="text-4xl font-bold text-center mb-6 text-primary">
        Available Foods
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Browse the latest food donations shared by our generous community
        members.
      </p>

      {loading && (
        <div className="flex justify-center my-20">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <p className="text-center text-red-500 my-10">
          Unable to load food items. Please try again later.
        </p>
      )}

      {!loading && !error && foods.length === 0 && (
        <p className="text-center text-gray-500 my-10">
          No available foods at the moment.
        </p>
      )}

      {!loading && !error && foods.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food) => (
            <SpotlightCard
              key={food._id}
              spotlightColor="rgba(0, 255, 200, 0.3)"
              className="card bg-base-100 shadow-lg hover:shadow-xl transition duration-300"
              data-aos="zoom-in"
            >
              <figure className="h-56">
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </figure>

              <div className="card-body">
                <h3 className="card-title text-xl font-semibold">
                  {food.food_name}
                </h3>

                <p className="text-gray-600">{food.food_quantity}</p>

                <p className="text-gray-600">
                  Pickup:{" "}
                  <span className="font-medium">{food.pickup_location}</span>
                </p>
                <p className="text-gray-600">
                  Expires:{" "}
                  <span className="font-medium">{food.expire_date}</span>
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={food?.donator?.image}
                    alt={food?.donator?.name}
                    className="w-8 h-8 rounded-full border"
                  />
                  <p className="text-sm text-gray-500">
                    Donator: {food?.donator?.name}
                  </p>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleViewDetails(food._id)}
                    className="btn btn-sm btn-primary text-white"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </div>
  );
}
