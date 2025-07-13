import { useForm } from "react-hook-form";
import { useContext } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import { time } from "motion";

const RequestAdvertisement = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const adData = {
      vendorName: user.displayName,
      vendorEmail: user.email,
      productName: data.productName,
      productImage: data.productImage,
      productPrice: data.productPrice,
      advertisementTitle: data.advertisementTitle,
      advertisementDescription: data.advertisementDescription,
      time: new Date().toISOString(),
      status:'pending'
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/advertisements`, adData);
      if (res.data.insertedId) {
        toast.success("Advertisement request submitted!");
        reset();
      }
    } catch (err) {
      toast.error("Failed to submit advertisement");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-200 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Request Advertisement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("productName", { required: true })} className="input input-bordered w-full" placeholder="Product Name" />
        <input {...register("productImage", { required: true })} className="input input-bordered w-full" placeholder="Product Image URL" />
        <input {...register("productPrice", { required: true })} type="number" className="input input-bordered w-full" placeholder="Product Price" />
        <input {...register("advertisementTitle", { required: true })} className="input input-bordered w-full" placeholder="Advertisement Title" />
        <textarea {...register("advertisementDescription", { required: true })} className="textarea textarea-bordered w-full" placeholder="Advertisement Description" />
        <button className="btn btn-primary w-full">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestAdvertisement;
