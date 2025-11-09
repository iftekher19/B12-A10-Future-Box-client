import { useContext, useEffect, useState } from "react";
import axios from "../axios.config";

import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

export default function MyRequests() {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // safety guard

    const fetchRequests = async () => {
      try {
        const { data } = await axios.get(`/my-requests?email=${user.email}`);
        setRequests(data);
      } catch {
        toast.error("Failed to load your requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <toast position="top-center" />

      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        My Food Requests
      </h2>

      {loading ? (
        <div className="flex justify-center my-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t requested any food yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-base-300">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Pickup Location</th>
                <th>Reason</th>
                <th>Contact No.</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id} className="hover">
                  <td>{index + 1}</td>

                  <td className="flex items-center gap-3">
                    <img
                      src={req.food_image || "/placeholder-food.png"}
                      alt={req.food_name || "food"}
                      className="w-12 h-12 rounded object-cover border"
                    />
                    <div>
                      <p className="font-semibold">
                        {req.food_name || "Food name not found"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {req.donatorName ? `Donator: ${req.donatorName}` : ""}
                      </p>
                    </div>
                  </td>

                  <td>{req.location}</td>
                  <td className="max-w-xs truncate">{req.reason}</td>
                  <td>{req.contactNo}</td>
                  <td>
                    {req.status === "pending" && (
                      <span className="badge badge-warning">Pending</span>
                    )}
                    {req.status === "accepted" && (
                      <span className="badge badge-success text-white">
                        Accepted
                      </span>
                    )}
                    {req.status === "rejected" && (
                      <span className="badge badge-error text-white">
                        Rejected
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
