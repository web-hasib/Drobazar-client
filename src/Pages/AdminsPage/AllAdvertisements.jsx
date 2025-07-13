import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllAdvertisements = () => {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");

  const fetchAds = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/advertisements`, {
        params: { status: filter, sort },
      });
      setAds(res.data);
    } catch {
      toast.error("Failed to load advertisements");
    }
  };

  useEffect(() => {
    fetchAds();
  }, [filter, sort]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/advertisements/${id}`, { status });
      toast.success(`Advertisement ${status}`);
      fetchAds();
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">All Advertisements</h2>
        <div className="flex gap-4">
          <select className="select select-bordered" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <select className="select select-bordered" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="recent">Sort: Recent</option>
            <option value="old">Sort: Old</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Vendor</th>
              <th>Product</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ads.map(ad => (
              <tr key={ad._id}>
                <td>
                  <p className="font-semibold">{ad.advertisementTitle}</p>
                  <p className="text-xs text-gray-500">{ad.advertisementDescription}</p>
                </td>
                <td>
                  {ad.vendorName}
                  <br />
                  <span className="text-xs">{ad.vendorEmail}</span>
                </td>
                <td>
                  <img src={ad.productImage} alt={ad.productName} className="w-12 h-12 object-cover rounded" />
                  <p>{ad.productName}</p>
                  <p className="text-sm text-gray-500">৳{ad.productPrice}</p>
                </td>
                <td>
                  <span className={`badge ${ad.status === 'approved' ? 'badge-success' : ad.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
                    {ad.status}
                  </span>
                </td>
                <td className="space-x-2">
                  {ad.status === "pending" && (
                    <>
                      <button className="btn btn-xs btn-success" onClick={() => handleStatusChange(ad._id, "approved")}>Approve</button>
                      <button className="btn btn-xs btn-error" onClick={() => handleStatusChange(ad._id, "rejected")}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAdvertisements;
