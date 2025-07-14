import { motion } from 'motion/react';
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { imageUpload } from '../../api/utils';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';


const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const { user } = useContext(AuthContext);

  // 🔁 Sync user safely after reload
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      try {
        const url = await imageUpload(image);
        setImageUrl(url);
        setUploadError('');
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploadError('Failed to upload image. Please try again.');
        setImageUrl(null);
      }
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      toast.error('Please upload an image.');
      return;
    }

    if (!currentUser) {
      toast.error('User not loaded yet. Please wait.');
      return;
    }

    const now = new Date().toISOString();

   const productData = {
  marketName: data.marketName,
  date: now,
  itemName: data.itemName,
  category: data.category, // <-- new
  description: data.description,
  price: [
    {
    price: parseFloat(data.price),
    date: now,
    unit: data.unit,
  }
  ],
  marketDescription: data.marketDescription,
  image: imageUrl,
  status: 'pending',
  vendor: {
    name: currentUser.displayName || 'Anonymous',
    email: currentUser.email,
    photo: currentUser.photoURL || null,
  },
  reviews: [],
};
    // console.log(productData);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/products`, productData);
      if (res.data.insertedId || res.data.success) {
        toast.success('Product added successfully!');
        reset();
        setImageUrl(null);
      } else {
        toast.error('Failed to add product.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product.');
    }
  };
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
  return (
   <motion.div
  className='max-w-7xl mx-auto py-10 px-2 md:px-4 lg:px-6 text-base-content flex justify-center items-start'
  initial='hidden'
  animate='visible'
  variants={fadeIn}
  transition={{ duration: 0.5 }}
>
  <form
    onSubmit={handleSubmit(onSubmit)}
    className='w-full bg-base-300/20 p-8 md:p-10 rounded-xl shadow-sm space-y-10'
  >
    <h2 className='text-2xl md:text-3xl font-bold text-center text-lime-600'>
      Add New Product
    </h2>

    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
      {/* LEFT SIDE */}
      <div className='space-y-6'>
        {/* Market Name */}
        <div className='space-y-1 text-sm'>
          <label htmlFor='marketName' className='block font-medium'>
            Market Name
          </label>
          <input
            {...register('marketName', { required: true })}
            className='w-full px-4 py-3 border focus:outline-lime-500 rounded-md shadow-sm'
            type='text'
            placeholder='e.g., Karwan Bazar'
          />
        </div>

        {/* Item Name */}
        <div className='space-y-1 text-sm'>
          <label htmlFor='itemName' className='block font-medium'>
            Item Name
          </label>
          <input
            {...register('itemName', { required: true })}
            className='w-full px-4 py-3 border focus:outline-lime-500 rounded-md shadow-sm'
            type='text'
            placeholder='e.g., Onion'
          />
        </div>
{/* Category */}
<div className='space-y-1 text-sm'>
  <label htmlFor='category' className='block font-medium'>
    Category
  </label>
  <select
    {...register('category', { required: true })}
    className='w-full bg-base-100 px-4 py-3 border focus:outline-lime-500 rounded-md shadow-sm'
  >
    <option value='vegetable'>Vegetable</option>
    <option value='fruits'>Fruits</option>
    <option value='drinks'>Drinks</option>
    <option value='grocery'>Grocery</option>
  </select>
</div>
        {/* Item Description */}
        <div className='space-y-1 text-sm'>
          <label htmlFor='description' className='block font-medium'>
            Item Description
          </label>
          <textarea
            {...register('description')}
            placeholder='Write item description...'
            className='w-full px-4 py-3 h-32 border focus:outline-lime-500 rounded-md shadow-sm resize-none'
          ></textarea>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className='space-y-6 flex flex-col'>
        {/* Price and Unit */}
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Price */}
          <div className='space-y-1 text-sm w-full'>
            <label htmlFor='price' className='block font-medium'>
              Price
            </label>
            <input
              {...register('price', { required: true, valueAsNumber: true })}
              className='w-full px-4 py-3 border focus:outline-lime-500 rounded-md shadow-sm'
              type='number'
              step='0.01'
              placeholder='৳ Price'
            />
          </div>

          {/* Unit */}
          <div className='space-y-1 text-sm w-full'>
            <label htmlFor='unit' className='block font-medium'>
              Unit
            </label>
            <select
              {...register('unit', { required: true })}
              className='w-full px-4 py-3 border bg-base-100 focus:outline-lime-500 rounded-md shadow-sm'
            >
              <option value='/kg'>/kg</option>
              <option value='/pcs'>/pcs</option>
              <option value='/dozen'>/dozen</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div className='space-y-1 text-sm'>
          <label className='block font-medium'>Upload Image</label>
          <div className='file_upload w-full px-5 py-4 border-2 border-dashed rounded-lg'>
            <div className='flex flex-col md:flex-row items-center justify-center gap-5 text-center'>
              <label>
                <input
                  onChange={handleImageUpload}
                  className='hidden'
                  type='file'
                  accept='image/*'
                />
                <div className='bg-lime-500/40 hover:bg-lime-400 hover:text-black text-white rounded-md px-4 py-2 cursor-pointer transition'>
                  Upload
                </div>
              </label>

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt='preview'
                  className='w-24 h-24 object-cover rounded-md border'
                />
              )}

              {uploadError && (
                <p className='text-sm text-red-500'>{uploadError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Market Description */}
        <div className='space-y-1 text-sm'>
          <label htmlFor='marketDescription' className='block font-medium'>
            Market Description
          </label>
          <textarea
            {...register('marketDescription')}
            placeholder='Details about the market location and history...'
            className='w-full px-4 py-3 h-24 border focus:outline-lime-500 rounded-md shadow-sm resize-none'
          ></textarea>
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          type='submit'
          disabled={isSubmitting}
          className='w-full py-3 lg:mt-5 font-semibold text-white bg-lime-500 hover:bg-lime-600 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md'
        >
          {isSubmitting ? 'Saving...' : 'Add Product'}
        </motion.button>
      </div>
    </div>
  </form>
</motion.div>
  );
};

export default AddProduct;
