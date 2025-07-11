import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SIngleProductCard from '../Components/cards/SIngleProductCard';
import Loading from './Loading';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState(''); // 'asc' or 'desc'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // items per page
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params: {
          page,
          limit,
          search,
          category: category !== 'all' ? category : undefined,
          sort: sort || undefined,
        },
      });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-lime-600 text-center">All Products</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex w-full md:w-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-lime-500"
            />
            <button
              type="submit"
              className="bg-lime-500 text-white px-4 py-2 rounded-r-md hover:bg-lime-600"
            >
              Search
            </button>
          </form>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-lime-500"
          >
            <option value="all">All Categories</option>
            <option value="fruit">Fruit</option>
            <option value="vegetable">Vegetable</option>
            <option value="grocery">Grocery</option>
            <option value="drinks">Drinks</option>
          </select>

          {/* Price Sort */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-lime-500"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <Loading/>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <SIngleProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
