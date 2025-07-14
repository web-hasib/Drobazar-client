import { motion } from 'framer-motion';
import { FaCheckCircle, FaRocket, FaTools } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-base-content">
      <motion.h1
        className="text-3xl text-lime-400 font-bold text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Dorbazar
      </motion.h1>

      <motion.div
        className="flex flex-col-reverse md:flex-row md:justify-between items-center gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.div
          className="space-y-5 md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="md:text-sm text-base leading-relaxed">
            <strong>Dorbazar</strong> is a smart and scalable marketplace designed for both vendors and users. We empower vendors to add and manage products seamlessly, while users enjoy an intuitive interface to purchase quality goods with transparent pricing.
          </p>
          <p className="md:text-sm text-base leading-relaxed">
            Our system features <span className="font-semibold">dynamic pricing</span>, <span className="font-semibold">real-time Stripe payments</span>, and <span className="font-semibold">role-based access</span> (Admin, Vendor, User) for secure control and actions. Each product includes a price history system and detailed review section.
          </p>
        </motion.div>

        <motion.img
          src="https://i.ibb.co/1GCnkTCL/about-vector.png"
          alt="Dorbazar Overview"
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
        <motion.div
          className="p-6 bg-base-300/40 rounded-lg shadow hover:shadow-lg transition-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FaTools className="text-4xl mx-auto text-primary mb-3" />
          <h3 className="text-xl  font-semibold">Full Vendor Control</h3>
          <p className="text-sm text-base-content/60 mt-2">Vendors can add, edit, update prices, and delete their products with full ownership.</p>
        </motion.div>

        <motion.div
          className="p-6 bg-base-300/40 rounded-lg shadow hover:shadow-lg transition-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <FaCheckCircle className="text-4xl mx-auto text-green-500 mb-3" />
          <h3 className="text-xl font-semibold">Secure Payment System</h3>
          <p className="text-sm text-base-content/60 mt-2">Seamless Stripe integration for real-time and secure transactions with receipt confirmation.</p>
        </motion.div>

        <motion.div
          className="p-6 bg-base-300/40 rounded-lg shadow hover:shadow-lg transition-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <FaRocket className="text-4xl mx-auto text-amber-500 mb-3" />
          <h3 className="text-xl font-semibold">User-Focused UX</h3>
          <p className="text-sm text-base-content/60 mt-2">Intuitive UI, product reviews, wishlist, and category-wise filtering for enhanced shopping experience.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
