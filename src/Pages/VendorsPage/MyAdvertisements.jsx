import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrashAlt } from 'react-icons/fa'; // Icon for delete button

// MyAdvertisements component displays a user's advertisements in a tabular format.
// It allows filtering by status and deleting advertisements.
const MyAdvertisements = () => {
  // Access user information from AuthContext
  const { user } = useContext(AuthContext);
  // State to store the list of advertisements
  const [ads, setAds] = useState([]);
  // State to manage the filter for advertisement status (all, pending, approved, rejected)
  const [filter, setFilter] = useState("all");
  // State for controlling the visibility of the custom confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // State to store the ID of the advertisement to be deleted
  const [adToDeleteId, setAdToDeleteId] = useState(null);

  // useEffect hook to fetch advertisements when the user email is available or changes.
  useEffect(() => {
    if (user?.email) {
      // Fetch advertisements specific to the logged-in user's email
      axios.get(`${import.meta.env.VITE_API_URL}/myAdvertisements?email=${user.email}`)
        .then(res => {
          // Update the advertisements state with fetched data
          setAds(res.data);
        })
        .catch(error => {
          // Log and show an error toast if fetching fails
          console.error("Failed to load advertisements:", error);
          toast.error("Failed to load advertisements");
        });
    }
  }, [user]); // Dependency array includes 'user' to re-run when user object changes

  // Function to handle the deletion of an advertisement
  const handleDelete = async (id) => {
    // Set the ID of the advertisement to be deleted and show the confirmation modal
    setAdToDeleteId(id);
    setShowConfirmModal(true);
  };

  // Function to confirm and proceed with deletion after user confirmation
  const confirmDelete = async () => {
    setShowConfirmModal(false); // Close the modal
    if (!adToDeleteId) return; // If no ID is set, do nothing

    try {
      // Send a DELETE request to the API for the specified advertisement ID
      await axios.delete(`${import.meta.env.VITE_API_URL}/advertisements/${adToDeleteId}`);
      // Show success toast
      toast.success("Advertisement deleted successfully!");
      // Update the local state to remove the deleted advertisement
      setAds(prev => prev.filter(ad => ad._id !== adToDeleteId));
    } catch (error) {
      // Log and show an error toast if deletion fails
      console.error("Failed to delete advertisement:", error);
      toast.error("Failed to delete advertisement. Please try again.");
    } finally {
      setAdToDeleteId(null); // Reset the adToDeleteId
    }
  };

  // Filter advertisements based on the selected status
  const filteredAds = filter === "all" ? ads : ads.filter(ad => ad.status === filter);

  return (
    <div className="p-4 sm:p-6 bg-base-100 min-h-screen font-inter">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-lime-400 mb-4 sm:mb-0">My Advertisements</h2>
        {/* Dropdown for filtering advertisements by status */}
        <select
          className="select select-bordered w-full sm:w-auto p-2 border rounded-md shadow-sm  text-base-content"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Conditional rendering for no advertisements found */}
      {filteredAds.length === 0 ? (
        <div className="text-center py-10 text-base-content">
          No advertisements found for the selected filter.
        </div>
      ) : (
        // Responsive table container
        <div className="overflow-x-auto bg-base-200 rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-base-content">
            {/* Table Header */}
            <thead className="bg-base-200">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-sm font-bold text-base-content ">
                  Image
                </th>
                <th scope="col" className="px-4 py-3 text-left text-sm font-bold text-base-content ">
                  Title
                </th>
                <th scope="col" className="px-4 py-3 text-left text-sm font-bold text-base-content ">
                  Product
                </th>
                <th scope="col" className="px-4 py-3 text-left text-sm font-bold text-base-content ">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 text-left text-sm font-bold text-base-content ">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-left text-sm font-bold text-base-content ">
                  Actions
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="bg-base-200 divide-y divide-base-content ">
              {filteredAds.map(ad => (
                <tr key={ad._id} className="hover:bg-base-300 transition-colors duration-150">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <img
                      src={ad.productImage || `https://placehold.co/60x60/cccccc/333333?text=No+Image`}
                      alt={ad.productName}
                      className="w-16 h-16 object-cover rounded-md shadow-sm"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/60x60/cccccc/333333?text=No+Image`; }}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-base-content">
                    {ad.advertisementTitle}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-base-content/60">
                    {ad.productName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-base-content/60">
                    ৳{ad.productPrice}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${ad.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        ad.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      title="Delete Advertisement"
                    >
                      <FaTrashAlt className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">Are you sure you want to delete this advertisement? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdvertisements;
