import { useEffect, useState, useContext } from "react";
import axios from "../axios.config";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

export default function FoodRequestsTable({ food }) {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // ✅ Fetch requests for this food (only for owner)
  useEffect(() => {
    if (!food?._id) return;
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/requests/${food._id}`);
        setRequests(data);
      } catch {
        toast.error("Failed to load food requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [food?._id, refresh]);

  // ✅ Handle Accept / Reject actions
  const handleStatusChange = async (id, status) => {
    try {
      const payload = { status, foodId: food._id };
      const { data } = await axios.patch(`/requests/${id}`, payload);
      if (data.success) {
        toast.success(`Request ${status}!`);
        setRefresh(!refresh);
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Failed to update request");
    }
  };

  // ✅ Show only if logged user is donator
  if (user?.email !== food?.donator?.email) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">
        Food Requests
      </h2>

      {loading ? (
        <div className="flex justify-center my-10">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-base-300">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Requester</th>
                <th>Email</th>
                <th>Location</th>
                <th>Reason</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="flex items-center gap-2">
                    <img
                      src={
                        req.userPhoto ||
                        "https://i.ibb.co/Qp1N8TD/default-avatar.png"
                      }
                      alt={req.userName}
                      className="w-8 h-8 rounded-full border"
                    />
                    <span>{req.userName}</span>
                  </td>
                  <td>{req.userEmail}</td>
                  <td>{req.location}</td>
                  <td className="max-w-xs truncate">{req.reason}</td>
                  <td>{req.contactNo}</td>
                  <td>
                    <span
                      className={`badge text-white ${
                        req.status === "accepted"
                          ? "badge-success"
                          : req.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "accepted")
                          }
                          className="btn btn-xs btn-success text-white"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "rejected")
                          }
                          className="btn btn-xs btn-error text-white"
                        >
                          Reject
                        </button>
                      </div>
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
