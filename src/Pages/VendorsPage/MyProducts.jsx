// MyProducts.jsx (Vendor-only page)
import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useRole from '../../Hooks/useRole';
import Loading from '../Loading';

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [refresh, setRefresh] = useState(false);
  const [role, isRoleLoading] = useRole();
  const [filter, setFilter] = useState('all');

  const { data: myProducts = [], isLoading, refetch } = useQuery({
    queryKey: ['my-products', user?.email, refresh],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/vendor/${user.email}`);
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/products/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success('Product deleted successfully');
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete product');
    }
  };

  if (isLoading || isRoleLoading) return <Loading />;
  if (role !== 'vendor') return <div className="text-center mt-10"><h2 className="text-2xl font-bold">Access Denied</h2><p>You do not have permission to view this page.</p></div>;

  const filteredProducts =
    filter === 'all' ? myProducts : myProducts.filter(p => p.status === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">My Products</h2>

      {/* Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        {['all', 'pending', 'approved', 'rejected'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`btn btn-sm ${filter === status ? 'btn-active' : ''}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Latest Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, idx) => (
              <tr key={product._id}>
                <td>{idx + 1}</td>
                <td><img src={product.image} alt={product.itemName} className="w-12 h-12 rounded" /></td>
                <td>{product.itemName}</td>
                <td>{product.category}</td>
                <td>
                  ৳{product.price.at(-1)?.price} {product.price.at(-1)?.unit}
                </td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      product.status === 'approved' ? 'badge-success' :
                      product.status === 'pending' ? 'badge-warning' :
                      'badge-error'
                    }`}
                  >
                    {product.status}
                  </span>
                  {product.status === 'rejected' && product.rejectionReason && (
                    <div className="text-xs text-red-500 mt-1">Reason: {product.rejectionReason}</div>
                  )}
                </td>
                <td>
                  <div className="flex gap-2">
                    <Link to={`/dashboard/edit-product/${product._id}`} className="btn btn-xs btn-info">Edit</Link>
                    <button onClick={() => handleDelete(product._id)} className="btn btn-xs btn-error">Delete</button>
                  </div>
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
