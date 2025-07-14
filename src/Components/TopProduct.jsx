import React, { useEffect, useState } from 'react';
import ProductCard from './cards/ProductCard';
import Loading from '../Pages/Loading';
import AuthButton from './shared/Buttons/AuthButton';
import { Link } from 'react-router';
import { motion } from "framer-motion";


const TopProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.3, 
    },
  },
};


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
    <div className="py-10 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-lime-400">
       Top Market Products
      </h2>

      {loading ? (
        <Loading></Loading>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center"
        
        variants={containerVariants} // Apply container variants
          initial="hidden" // Set initial state
          animate="visible"
          >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          <div className="col-span-full text-center mt-6">
            <Link to="/all-items" >
          <AuthButton lable='All Products'></AuthButton>
           </Link>
           </div>
        </motion.div>
      )}
    </div>
  );
};

export default TopProduct;
