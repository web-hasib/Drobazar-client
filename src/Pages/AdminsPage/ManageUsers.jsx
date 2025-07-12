import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ConfirmModal from '../../Components/Modals/ConfirmModal';


const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [limit] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'promote' or 'demote'

  const { data, refetch } = useQuery({
    queryKey: ['users', page, search],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        params: { page, limit, search },
      });
      return res.data;
    },
  });

  const handleConfirm = async () => {
    try {
      if (modalAction === 'promote') {
        const res = await axiosSecure.patch(`/users/make-admin/${selectedUser._id}`);
        if (res.data.modifiedCount > 0) {
          toast.success('User promoted to admin');
        }
      } else if (modalAction === 'demote') {
        const res = await axiosSecure.patch(`/users/remove-admin/${selectedUser._id}`);
        if (res.data.modifiedCount > 0) {
          toast.success('Admin demoted to user');
        }
      }
      refetch();
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setSelectedUser(null);
      setModalAction(null);
    }
  };

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl text-lime-400 text-center font-bold mb-4">Manage Users</h2>
<div className='flex flex-col items-center mb-6'>

      <input 
        type="text"
        placeholder="Search by name or email"
        className="input input-bordered border-lime-100 rounded-2xl border-dashed mx-auto  text-center mb-4 w-full max-w-sm"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />
</div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border border-dashed border-lime-200/10 rounded-2xl  ">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user, idx) => (
              <tr key={user._id}>
                <td>{(page - 1) * limit + idx + 1}</td>
                <td>{user.name}</td>
                <td className='italic'>{user.email}</td>
                <td className='badge bg-base-content/40 text-base-100 badge-accent badge-sm rounded-3xl mt-4'>{user.role}</td>
                <td>
                  {user.role === 'admin' ? (
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setModalAction('demote');
                      }}
                      className="btn btn-sm btn-warning rounded-2xl px-6 text-base-content"
                    >
                      Demote
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setModalAction('promote');
                      }}
                      className="btn btn-sm bg-lime-500 rounded-2xl text-base-content"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => setPage(n + 1)}
            className={`btn btn-sm ${page === n + 1 ? 'btn-active' : ''}`}
          >
            {n + 1}
          </button>
        ))}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={!!selectedUser}
        title="Are you sure?"
        message={`Do you want to ${
          modalAction === 'promote' ? 'promote' : 'demote'
        } ${selectedUser?.name}?`}
        onClose={() => setSelectedUser(null)}
        onConfirm={handleConfirm}
      
      />
    </div>
  );
};

export default ManageUsers;
