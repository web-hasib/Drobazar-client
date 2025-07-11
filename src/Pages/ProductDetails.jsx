import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Loading from './Loading';
import { FaStar } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading/>;
  if (!product) return <p className="text-center py-20 text-red-500">Product not found</p>;

  const { itemName, image, price, description, marketName, marketDescription, vendor, category, date, reviews = [] } = product;
  console.log(reviews);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-base-content">
      <div className="bg-base-200/20 rounded-lg shadow lg:p-2 space-y-6">
        {/* Image & Header */}
        <div className="flex flex-col lg:flex-row gap-6">
          <img src={image} alt={itemName} className="w-full lg:w-1/2 rounded-md object-cover max-h-96" />
          <div className="space-y-2 lg:w-1/2">
            <h2 className="text-2xl font-bold">{itemName}</h2>
            <span className="inline-block bg-lime-100 text-lime-700 px-2 py-1 rounded text-sm">{category}</span>
            <p className="text-xl font-semibold mt-2">৳ {price?.price} <span className="text-sm text-gray-500">{price?.unit}</span></p>
            <p className="text-sm text-gray-500">🗓 {format(new Date(date), 'PPP')}</p>
            <p className="mt-2 text-sm">{description}</p>
          </div>
        </div>

        {/* Market Description */}
        <div>
          <h3 className="text-lg font-bold">Market Info</h3>
          <p><span className="font-medium">Market Name:</span> {marketName}</p>
          <p><span className="font-medium">Details:</span> {marketDescription}</p>
        </div>

        {/* Vendor Info */}
        <div>
          <h3 className="text-lg font-bold mb-2">Vendor Info</h3>
          <div className="flex items-center gap-3">
            <img src={vendor?.photo} alt={vendor?.name} className="w-12 h-12 rounded-full border" />
            <div>
              <p className="font-semibold">{vendor?.name}</p>
              <p className="text-sm text-gray-500">{vendor?.email}</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        
          <div className="mt-10">
      <h3 className="text-xl font-bold text-base-content mb-4">
        Reviews ({reviews.length})
      </h3>

      {reviews.length === 0 ? (
        <p className="text-sm text-base-content/60">No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review, index) => (
            <li
              key={index}
              className="bg-base-200 p-4 rounded-lg border border-base-300 shadow-sm hover:shadow-md transition-all"
            >
              <div className='flex flex-col md:flex-row mb-3 justify-between'>

              <div className="flex items-center gap-3 mb-2">
                {/* Avatar fallback to initials or default */}
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow">
                  {review.email?.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-base-content">{review.email}</p>
                  <p className="text-xs text-base-content/50">
                    {format(new Date(review.time), 'PPP')}
                  </p>
                </div>
              </div>

              {/* Rating stars */}
              <div className="flex gap-1 text-yellow-400 text-sm mb-7">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < review.rating ? 'fill-yellow-400' : 'text-base-content/30'} />
                ))}
               
              </div>
              </div>

              {/* Message */}
              <p className="text-sm text-base-content/50">{review.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
      </div>
    </div>
  );
};

export default ProductDetails;
