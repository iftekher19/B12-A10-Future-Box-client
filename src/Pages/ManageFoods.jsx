import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "../axios.config";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../Components/LoadingSpinner";

export default function ManageFoods() {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null); // for update modal
  const [loading, setLoading] = useState(true);

  // Fetch user's added foods
  useEffect(() => {
    if (!user) return;
    const fetchMyFoods = async () => {
      try {
        const { data } = await axios.get(`/foods?email=${user.email}`);
        setFoods(data);
      } catch {
        toast.error("Failed to load foods");
      } finally {
        setLoading(false);
      }
    };
    fetchMyFoods();
  }, [user]);

  // Delete food
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food entry will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(`/foods/${id}`);
          if (data.success) {
            setFoods(foods.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Your food has been deleted.", "success");
          }
        } catch {
          Swal.fire("Error", "Failed to delete this item.", "error");
        }
      }
    });
  };

  // Submit updated food
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDoc = {
        food_name: selectedFood.food_name,
        food_image: selectedFood.food_image,
        food_quantity: selectedFood.food_quantity,
        pickup_location: selectedFood.pickup_location,
        expire_date: selectedFood.expire_date,
        additional_notes: selectedFood.additional_notes,
      };
      const { data } = await axios.patch(
        `/foods/${selectedFood._id}`,
        updatedDoc
      );
      if (data.success) {
        toast.success("Food updated successfully!");
        setSelectedFood(null);
        // refresh list
        const { data: updatedFoods } = await axios.get(
          `/foods?email=${user.email}`
        );
        setFoods(updatedFoods);
      }
    } catch {
      toast.error("Update failed!");
    }
  };

  // Handle form changes in modal
  const handleChange = (e) => {
    setSelectedFood({ ...selectedFood, [e.target.name]: e.target.value });
  };

  if (loading)
    return (
      <div className="flex justify-center my-20">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <Toaster position="top-center" />
      <h1 className="text-4xl font-bold text-center text-primary mb-8">
        Manage My Foods
      </h1>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500">No foods added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-base-300">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Quantity</th>
                <th>Pickup Location</th>
                <th>Expire Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food, idx) => (
                <tr key={food._id} className="hover">
                  <td>{idx + 1}</td>
                  <td className="flex items-center gap-3">
                    <img
                      src={food.food_image}
                      alt={food.food_name}
                      className="w-12 h-12 rounded object-cover border"
                    />
                    <span className="font-medium">{food.food_name}</span>
                  </td>
                  <td>{food.food_quantity}</td>
                  <td>{food.pickup_location}</td>
                  <td>{food.expire_date}</td>
                  <td>
                    <span className="badge badge-info text-white">
                      {food.food_status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedFood(food)}
                      className="btn btn-sm btn-warning mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== Update Modal ===== */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setSelectedFood(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-4 text-center">
              Update Food
            </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                type="text"
                name="food_name"
                value={selectedFood.food_name}
                onChange={handleChange}
                placeholder="Food Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="food_image"
                value={selectedFood.food_image}
                onChange={handleChange}
                placeholder="Food Image URL"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="food_quantity"
                value={selectedFood.food_quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="pickup_location"
                value={selectedFood.pickup_location}
                onChange={handleChange}
                placeholder="Pickup Location"
                className="input input-bordered w-full"
                required
              />
              <input
                type="date"
                name="expire_date"
                value={selectedFood.expire_date}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="additional_notes"
                value={selectedFood.additional_notes}
                onChange={handleChange}
                placeholder="Additional Notes"
                className="textarea textarea-bordered w-full"
              />
              <div className="flex justify-between pt-4">
                <button type="submit" className="btn btn-success text-white">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFood(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
