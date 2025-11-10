import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios.config";

import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import FoodRequestsTable from "./FoodRequestsTable";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function FoodDetails() {
  const { id } = useParams(); // food id from route
  const { user } = useContext(AuthContext); // logged-in user info
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestModal, setRequestModal] = useState(false); // modal state
  const [form, setForm] = useState({ location: "", reason: "", contactNo: "" });

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const { data } = await axios.get(`/foods/${id}`);
        setFood(data);
      } catch {
        toast.error("Failed to load food details");
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  // Handle food request submission
  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        foodId: id,
        userEmail: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
        location: form.location,
        reason: form.reason,
        contactNo: form.contactNo,
        status: "pending",
        food_name: food.food_name,
        food_image: food.food_image,
        donatorName: food?.donator?.name,
        donatorEmail: food?.donator?.email,
      };

      const { data } = await axios.post("/requests", payload);
      if (data.success) {
        toast.success("Request submitted successfully!");
        setRequestModal(false);
        setForm({ location: "", reason: "", contactNo: "" });
      } else {
        toast.error("Failed to submit food request");
      }
    } catch {
      toast.error("Error submitting request");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center my-20">
        <LoadingSpinner />;
      </div>
    );

  if (!food)
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 text-lg">Food not found.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <toast position="top-center" />

      {/* ===== Food Image and Details ===== */}
      <div className="shadow-lg rounded-lg overflow-hidden bg-base-100">
        <img
          src={food.food_image}
          alt={food.food_name}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{food.food_name}</h1>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Quantity:</strong> {food.food_quantity}
            </p>
            <p>
              <strong>Pickup Location:</strong> {food.pickup_location}
            </p>
            <p>
              <strong>Expire Date:</strong> {food.expire_date}
            </p>
            <p>
              <strong>Status:</strong> {food.food_status}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold mb-2 text-lg">Additional Notes:</h2>
            <p className="bg-base-200 p-3 rounded-md">
              {food.additional_notes || "No additional notes provided."}
            </p>
          </div>
        </div>
      </div>

      {/* ===== Donator Info ===== */}
      {food.donator && (
        <div className="bg-base-200 rounded-lg p-5 flex items-center gap-4 shadow">
          <img
            src={food.donator.image}
            alt={food.donator.name}
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h3 className="font-bold text-lg">{food.donator.name}</h3>
            <p className="text-gray-600">{food.donator.email}</p>
          </div>
        </div>
      )}

      {/* ===== Request Food Button ===== */}
      <div className="text-center">
        <button
          onClick={() => setRequestModal(true)}
          className="btn btn-primary text-white"
        >
          Request Food
        </button>
      </div>

      {/* ===== Modal for Request Form ===== */}
      {requestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative animate-fadeIn">
            <button
              onClick={() => setRequestModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-4 text-center">
              Request This Food
            </h3>
            <form onSubmit={handleRequest} className="space-y-4">
              <input
                type="text"
                placeholder="Your Pickup Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="input input-bordered w-full"
                required
              />

              <textarea
                placeholder="Why do you need this food?"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="textarea textarea-bordered w-full"
                rows={3}
                required
              />

              <input
                type="text"
                placeholder="Contact Number"
                value={form.contactNo}
                onChange={(e) =>
                  setForm({ ...form, contactNo: e.target.value })
                }
                className="input input-bordered w-full"
                required
              />

              <div className="flex justify-between mt-4">
                <button type="submit" className="btn btn-success text-white">
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setRequestModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <FoodRequestsTable food={food} />
    </div>
  );
}
