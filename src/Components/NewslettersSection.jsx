import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";


const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) return toast.error("Please enter an email");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/newsletter`, { email });
      if (res.data.insertedId) {
        toast.success("Subscribed successfully!");
        setEmail("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Subscription failed");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-base-200 py-12 px-4 rounded-xl relative shadow max-w-7xl mx-4 my-16 overflow-hidden text-center"
    >
      {/* Added opacity-30 and z-0 to the image, and z-10 to the content */}
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
        src="https://i.ibb.co/C3nvLtzB/4774-removebg-preview.png"
        alt=""
      />
      
      {/* Wrap content in a div to ensure it's above the image */}
      <div className="relative z-10"> 
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-600 text-transparent bg-clip-text">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-sm font-semibold italic text-base-content/40  mb-6">Get weekly updates and exclusive offers from Dorbazar!</p>
        <div className="flex flex-col sm:flex-row md:w-2/3 mx-auto lg:w-3/5 justify-center gap-3 sm:gap-0">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input input-bordered border-lime-500 sm:border-r-0 sm:-mr-1 sm:rounded-l-2xl w-full sm:w-2/3"
          />
          <button
            onClick={handleSubscribe}
            className="relative inline-flex font-semibold items-center w-29  sm:w-auto justify-center px-6 py-1 rounded sm:rounded-r-2xl border border-lime-600/70 hover:border-green-100/70 hover:text-white bg-green-400/5 text-lime-600 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-lime-600/70 transition-transform duration-300 scale-x-0 origin-left group-hover:scale-x-100"></span>
            <span className="relative z-10">Subscribe</span>
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterSection;
