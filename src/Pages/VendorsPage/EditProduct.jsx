// src/Pages/Dashboard/EditProduct.jsx
import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { imageUpload } from '../../api/utils';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const axios = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    axios.get(`/product/${id}`).then(res => {
      const product = res.data;
      reset({
        marketName: product.marketName,
        itemName: product.itemName,
        category: product.category,
        description: product.description,
        marketDescription: product.marketDescription,
        price: product.price.at(-1)?.price || '',
        unit: product.price.at(-1)?.unit || '/kg'
      });
      setImageUrl(product.image);
    }).catch(() => toast.error('Failed to fetch product'));
  }, [id, axios, reset]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const url = await imageUpload(file);
        setImageUrl(url);
        setUploadError('');
      } catch (err) {
        setUploadError('Failed to upload image');
        setImageUrl(null);
      }
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) return toast.error('Please upload an image first');

    const payload = {
      marketName: data.marketName,
      itemName: data.itemName,
      category: data.category,
      description: data.description,
      marketDescription: data.marketDescription,
      image: imageUrl,
      price: parseFloat(data.price),
      unit: data.unit
    };

    try {
      const res = await axios.patch(`/products/${id}`, payload);
      if (res.data.modifiedCount > 0) {
        toast.success('Product updated!');
        navigate('/dashboard/my-products');
      } else {
        toast.warn('No changes made.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update product');
    }
  };

  const fadeIn = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto py-10 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-base-300/20 p-8 rounded-xl space-y-8">
        <h2 className="text-3xl font-bold text-center text-lime-600">Edit Product</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="text-sm space-y-1">
              <label>Market Name</label>
              <input {...register('marketName', { required: true })} className="input input-bordered w-full" />
            </div>
            <div className="text-sm space-y-1">
              <label>Item Name</label>
              <input {...register('itemName', { required: true })} className="input input-bordered w-full" />
            </div>
            <div className="text-sm space-y-1">
              <label>Category</label>
              <select {...register('category')} className="select select-bordered w-full">
                <option value="vegetable">Vegetable</option>
                <option value="fruits">Fruits</option>
                <option value="drinks">Drinks</option>
                <option value="grocery">Grocery</option>
              </select>
            </div>
            <div className="text-sm space-y-1">
              <label>Description</label>
              <textarea {...register('description')} className="textarea textarea-bordered w-full h-32" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-full">
                <label>Price</label>
                <input {...register('price', { required: true })} type="number" step="0.01" className="input input-bordered w-full" />
              </div>
              <div className="w-full">
                <label>Unit</label>
                <select {...register('unit')} className="select select-bordered w-full">
                  <option value="/kg">/kg</option>
                  <option value="/pcs">/pcs</option>
                  <option value="/dozen">/dozen</option>
                </select>
              </div>
            </div>

            <div className="text-sm space-y-1">
              <label>Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {imageUrl && <img src={imageUrl} className="w-24 h-24 rounded" />}
              {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
            </div>

            <div className="text-sm space-y-1">
              <label>Market Description</label>
              <textarea {...register('marketDescription')} className="textarea textarea-bordered w-full h-24" />
            </div>

            <motion.button type="submit" disabled={isSubmitting}
              whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }}
              className="btn bg-lime-500 text-white w-full">
              {isSubmitting ? 'Saving...' : 'Update Product'}
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default EditProduct;
