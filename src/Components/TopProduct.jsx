import React, { useEffect, useState } from 'react';
import ProductCard from './cards/ProductCard';


const TopProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch top products on mount
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/top-products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch top products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div className="py-10 px-4 md:px-10 lg:px-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-lime-600">
        🏆 Top Market Products
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopProduct;
