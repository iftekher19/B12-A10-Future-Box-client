import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "../axios.config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

export default function AddFood() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    food_name: "",
    food_image: "",
    food_quantity: "",
    pickup_location: "",
    expire_date: "",
    additional_notes: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast("Please log in to add food", { icon: "🔐" });
      return navigate("/login");
    }

    const newFood = {
      ...form,
      donator: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
      food_status: "Available",
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      const { data } = await axios.post("/foods", newFood);
      if (data.success) {
        toast.success("🎉 Food added successfully!");
        setForm({
          food_name: "",
          food_image: "",
          food_quantity: "",
          pickup_location: "",
          expire_date: "",
          additional_notes: "",
        });
        setTimeout(() => navigate("/ManageFoods"), 1000);
      } else {
        toast.error("Failed to add food!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding food.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Toaster position="top-center" />
      <h1 className="text-4xl font-bold text-center text-primary mb-8">
        Add Food
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-base-100 shadow-lg rounded-lg p-8 space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Food Name */}
          <div>
            <label className="font-semibold">Food Name *</label>
            <input
              type="text"
              name="food_name"
              value={form.food_name}
              onChange={handleChange}
              required
              placeholder="e.g. Homemade Pasta"
              className="input input-bordered w-full"
            />
          </div>

          {/* Food Image URL */}
          <div>
            <label className="font-semibold">Food Image (imgbb URL) *</label>
            <input
              type="text"
              name="food_image"
              value={form.food_image}
              onChange={handleChange}
              required
              placeholder="Paste uploaded image URL here"
              className="input input-bordered w-full"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="font-semibold">Food Quantity *</label>
            <input
              type="text"
              name="food_quantity"
              value={form.food_quantity}
              onChange={handleChange}
              required
              placeholder="Serves 3 people"
              className="input input-bordered w-full"
            />
          </div>

          {/* Pickup Location */}
          <div>
            <label className="font-semibold">Pickup Location *</label>
            <input
              type="text"
              name="pickup_location"
              value={form.pickup_location}
              onChange={handleChange}
              required
              placeholder="e.g. Central Park, NY"
              className="input input-bordered w-full"
            />
          </div>

          {/* Expire Date */}
          <div>
            <label className="font-semibold">Expire Date *</label>
            <input
              type="date"
              name="expire_date"
              value={form.expire_date}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="font-semibold">Additional Notes</label>
          <textarea
            name="additional_notes"
            rows={4}
            value={form.additional_notes}
            onChange={handleChange}
            placeholder="e.g. Contains peanuts, please keep refrigerated."
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary text-white"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Add Food Item"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
