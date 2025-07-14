import { useForm } from "react-hook-form";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import { motion } from "framer-motion";

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
      status: "pending",
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/advertisements`, adData);
      if (res.data.insertedId) {
        toast.success("✅ Advertisement request submitted!");
        reset();
      }
    } catch (err) {
      toast.error("❌ Failed to submit advertisement");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-300/10 p-8 rounded-2xl shadow-sm border border-base-200"
      >
        <h2 className="text-3xl font-bold text-center text-lime-500 mb-6"> Request Advertisement</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="label">Product Name</label>
            <input
              {...register("productName", { required: true })}
              className="input input-bordered w-full"
              placeholder="e.g. Fresh Mango"
            />
          </div>

          <div className="col-span-1">
            <label className="label">Product Image URL</label>
            <input
              {...register("productImage", { required: true })}
              className="input input-bordered w-full"
              placeholder="Paste image URL"
            />
          </div>

          <div className="col-span-1">
            <label className="label">Product Price</label>
            <input
              {...register("productPrice", { required: true })}
              type="number"
              className="input input-bordered w-full"
              placeholder="e.g. 120"
            />
          </div>

          <div className="col-span-1">
            <label className="label">Advertisement Title</label>
            <input
              {...register("advertisementTitle", { required: true })}
              className="input input-bordered w-full"
              placeholder="Catchy Ad Title"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="label">Advertisement Description</label>
            <textarea
              {...register("advertisementDescription", { required: true })}
              className="textarea textarea-bordered w-full"
              rows={4}
              placeholder="Write a compelling ad description..."
            ></textarea>
          </div>

          <div className="col-span-1 md:col-span-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              className="w-full py-3 lg:mt-5 font-semibold text-white bg-lime-500 hover:bg-lime-600 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
            >
               Submit Request
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RequestAdvertisement;
