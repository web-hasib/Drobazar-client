// src/Pages/Dashboard/VendorRequests.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Loading from '../Loading';

const VendorRequests = () => {
  const axios = useAxiosSecure();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['vendor-requests'],
    queryFn: async () => {
      const res = await axios.get('/vendor-requests');
      return res.data;
    }
  });

  const handleApprove = async (id) => {
    try {
      const res = await axios.patch(`/users/make-vendor/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success('Vendor approved!');
        refetch();
      }
    } catch {
      toast.error('Approval failed');
    }
  };

  if (isLoading) return <Loading/>

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl text-lime-400 text-center font-bold mb-6">Vendor Requests</h2>

      {requests.length === 0 ? (<div className='flex mt-30 flex-col items-center justify-center h-64'>
        <img src="https://i.ibb.co/VWLpSk2N/empty.png" alt="" />
        <p className='text-yellow-400 text-center mt-10'>
          No vendor requests available.</p></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <img src={u.imageURL} alt="avatar" className="w-10 h-10 rounded-full" />
                  </td>
                  <td>
                    <button
                      onClick={() => handleApprove(u._id)}
                      className="btn btn-sm btn-success"
                    >
                      Approve Vendor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VendorRequests;
