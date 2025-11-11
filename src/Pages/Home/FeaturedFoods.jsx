import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import SpotlightCard from "../../Components/SpotlightCard";


export default function FeaturedFoods({ food }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    _id,
    food_image,
    food_name,
    food_quantity,
    pickup_location,
    expire_date,
    donator,
  } = food;

  // Handle View Details click
  const handleViewDetails = () => {
    if (!user) {
      toast("Please login to view food details", { icon: "🔐" });
      navigate("/login", { state: { from: { pathname: `/food/${_id}` } } });
    } else {
      navigate(`/food/${_id}`);
    }
  };

  return (
    <SpotlightCard
      spotlightColor="rgba(0, 255, 200, 0.3)"
      className="bg-base-100 shadow hover:shadow-lg transition duration-300"
      data-aos="zoom-in"
    >
      <figure className="h-56">
        <img
          src={food_image}
          alt={food_name}
          className="object-cover w-full h-full rounded-t-lg"
        />
      </figure>

      <div className="card-body">
        <h3 className="card-title text-xl font-semibold">{food_name}</h3>
        <p className="text-gray-600">{food_quantity}</p>
        <p className="text-gray-600">
          Pickup: <span className="font-medium">{pickup_location}</span>
        </p>
        <p className="text-gray-600">
          Expires: <span className="font-medium">{expire_date}</span>
        </p>

        <div className="flex items-center gap-3 mt-2">
          <img
            src={donator?.image}
            alt={donator?.name}
            className="w-8 h-8 rounded-full border"
          />
          <p className="text-sm text-gray-500">{donator?.name}</p>
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            onClick={handleViewDetails}
            className="btn btn-sm btn-primary text-white"
          >
            View Details
          </button>
        </div>
      </div>
    </SpotlightCard>
  );
}
