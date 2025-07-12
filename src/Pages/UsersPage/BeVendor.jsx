// src/Pages/Dashboard/BeVendor.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import useRole from '../../Hooks/useRole';

const BeVendor = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const [role, isRoleLoading] = useRole();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequest = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.patch(`/users/request-vendor/${user.email}`);
      if (res.data.modifiedCount > 0) {
        toast.success('Request sent! Wait for admin approval.');
      } else {
        toast.error('Request failed or already vendor.');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRoleLoading) return <Loading />;
  if (role !== 'user') {
    return <div className="text-center py-10"><h2 className="text-xl font-bold">Access Denied</h2></div>;
  }

  return (
    <div className="max-w-xl mx-auto text-center py-10 space-y-4">
      <h2 className="text-2xl font-bold text-lime-600">Become a Vendor</h2>
      <p className="text-gray-600">Want to sell your products? Click below to request vendor access.</p>
      <button
        disabled={isSubmitting}
        onClick={handleRequest}
        className="btn btn-success"
      >
        {isSubmitting ? 'Requesting...' : 'Request Vendor Access'}
      </button>
    </div>
  );
};

export default BeVendor;
