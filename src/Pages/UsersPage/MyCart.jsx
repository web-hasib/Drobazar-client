import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../provider/AuthProvider';

const MyCarts = () => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const { data: cart = [], refetch } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/cart/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const handleRemove = async (productId) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/cart/remove/${user.email}`,
        { productId }
      );
      if (res.data.modifiedCount > 0) {
        toast.success('Removed from cart');
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove item');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">🛒 My Cart Items ({cart.length})</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">You have no items in your cart.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Quantity</th>
                <th>Added At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.productId}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td>{item.itemName}</td>
                  <td>৳ {item.price}</td>
                  <td>{item.unit}</td>
                  <td>{item.quantity}</td>
                  <td>{new Date(item.addedAt).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => navigate(`/product/${item.productId}`)}
                      className="btn btn-sm btn-primary"
                    >
                      Buy
                    </button>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="btn btn-sm btn-error"
                    >
                      Remove
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

export default MyCarts;
