// src/Pages/Dashboard/MyProducts.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useRole from '../../Hooks/useRole';
import Loading from '../Loading';

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();
  const [role, isRoleLoading] = useRole();
  const [filter, setFilter] = useState('all');

  const { data: myProducts = [], isLoading, refetch } = useQuery({
    queryKey: ['my-products', user?.email, filter],
    enabled: !!user?.email,
    queryFn: () => axios.get(`/products/vendor/${user.email}`)
      .then(res => res.data),
  });

  if (isLoading || isRoleLoading) return <Loading />;
  if (role !== 'vendor') return <p className="mt-10 text-center">Access Denied</p>;

  const filtered = filter === 'all' ? myProducts : myProducts.filter(p => p.status === filter);

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      text: 'This cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it'
    });
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`/products/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success('Deleted successfully!');
          refetch();
        }
      } catch {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl text-lime-400 text-center font-bold mb-4">My Products</h2>
      <div className="mb-4 flex gap-2">
        {['all','pending','approved','rejected'].map(s => (
          <button key={s} onClick={()=>setFilter(s)}
            className={`btn btn-sm ${filter===s?'btn-active':''}`}>
            {s.charAt(0).toUpperCase()+s.slice(1)}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th><th>Image</th><th>Name</th><th>Category</th>
              <th>Latest Price</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p,i)=>(
              <tr key={p._id}>
                <td>{i+1}</td>
                <td><img src={p.image} className="w-12 rounded" alt="" /></td>
                <td>{p.itemName}</td>
                <td>{p.category}</td>
                <td>৳{p.price.at(-1).price} {p.price.at(-1).unit}</td>
                <td>
                  <span className={`badge badge-sm ${
                    p.status === 'approved' ? 'badge-success' :
                    p.status === 'pending' ? 'badge-warning' : 'badge-error'
                  }`}>
                    {p.status}
                  </span>
                  {p.status==='rejected' && p.rejectionReason && (
                    <div className="text-xs text-red-500">Reason: {p.rejectionReason}</div>
                  )}
                </td>
                <td className="flex gap-2">
                  <Link to={`/dashboard/edit-product/${p._id}`} className="btn btn-xs btn-info">Edit</Link>
                  <button onClick={()=>handleDelete(p._id)} className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
