import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useRole from '../../Hooks/useRole';
import Loading from '../Loading';
import { toast } from 'react-toastify';
import RejectModal  from '../../Components/Modals/RejectModal';


const AllProductsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('recent');
  const [page, setPage] = useState(1);
  const limit = 10;

  // Modal state
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const { data = {}, isLoading, refetch } = useQuery({
    queryKey: ['admin-products', statusFilter, sortOrder, page],
    queryFn: async () => {
      const params = {
        page,
        limit,
        ...(statusFilter !== 'all' && { status: statusFilter }),
        time: sortOrder,
      };
      const res = await axiosSecure.get('/admin-products', { params });
      return res.data;
    },
  });

  const allProducts = data.products || [];
  const totalPages = data.totalPages || 1;

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/products/approve/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success('Product approved');
        refetch();
      }
    } catch {
      toast.error('Failed to approve');
    }
  };

  const openRejectModal = (id) => {
    setSelectedProductId(id);
    setIsRejectModalOpen(true);
  };

  const handleRejectSubmit = async (reason) => {
    try {
      const res = await axiosSecure.patch(`/products/reject/${selectedProductId}`, { reason });
      if (res.data.modifiedCount > 0) {
        toast.success('Product rejected');
        refetch();
      }
    } catch {
      toast.error('Failed to reject');
    }
  };

  if (isLoading || isRoleLoading) return <Loading />;
  if (role !== 'admin') {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl text-lime-500 text-center font-bold mb-6">All Products (Admin View)</h2>

      {/* Filter controls */}
      <div className="flex justify-between items-center mb-4">
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          className="select select-bordered"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setPage(1);
          }}
        >
          <option value="recent">Recent</option>
          <option value="old">Old</option>
        </select>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border border-dashed border-lime-200/10 table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Vendor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, idx) => (
              <tr key={product._id}>
                <td>{(page - 1) * limit + idx + 1}</td>
                <td>
                  <img src={product.image} alt="img" className="w-12 h-12 rounded" />
                </td>
                <td>{product.itemName}</td>
                <td>{product.category}</td>
                <td>
                  ৳{product.price?.at(-1)?.price} {product.price?.at(-1)?.unit}
                </td>
                <td>
                  <span
                    className={`badge ${
                      product.status === 'approved'
                        ? 'badge-success'
                        : product.status === 'pending'
                        ? 'badge-warning'
                        : 'badge-error'
                    }`}
                  >
                    {product.status}
                  </span>
                  {product.status === 'rejected' && product.rejectionReason && (
                    <div className="text-xs text-red-500">Reason: {product.rejectionReason}</div>
                  )}
                </td>
                <td>{product.vendor?.email}</td>
                <td className="space-x-2">
                  {product.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(product._id)}
                        className="btn btn-xs btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => openRejectModal(product._id)}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {product.status === 'approved' && (
                    <button
                      onClick={() => openRejectModal(product._id)}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex gap-2">
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

      {/* Reject Modal */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onSubmit={handleRejectSubmit}
      />
    </div>
  );
};

export default AllProductsAdmin;
