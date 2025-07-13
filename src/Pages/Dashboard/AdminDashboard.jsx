import { motion } from "framer-motion";
import { use } from "react";
import CountUp from "react-countup";
import { FaUsers, FaStore, FaBox, FaCrown, FaChartPie } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";

const AdminDashboard = () => {
    const {user}= use(AuthContext)
  const stats = {
    totalUsers: 1245,
    vendors: 58,
    admins: 3,
    products: 289,
  };

  const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-10 px-4"
      initial="hidden"
      
      animate="visible"
      variants={fade}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-lime-200 to-lime-400 text-black p-6 rounded-xl shadow-lg flex items-center gap-4"
        >
          <FaUsers className="text-4xl" />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.totalUsers} duration={1.5} />
            </p>
            <p className="text-sm font-medium">Total Users</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-blue-200 to-blue-400 text-black p-6 rounded-xl shadow-lg flex items-center gap-4"
        >
          <FaStore className="text-4xl" />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.vendors} duration={1.5} />
            </p>
            <p className="text-sm font-medium">Vendors</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-orange-200 to-orange-400 text-black p-6 rounded-xl shadow-lg flex items-center gap-4"
        >
          <FaCrown className="text-4xl" />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.admins} duration={1.5} />
            </p>
            <p className="text-sm font-medium">Admins</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-purple-200 to-purple-400 text-black p-6 rounded-xl shadow-lg flex items-center gap-4"
        >
          <FaBox className="text-4xl" />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.products} duration={1.5} />
            </p>
            <p className="text-sm font-medium">Products</p>
          </div>
        </motion.div>
      </div>

      {/* Pie chart placeholder */}
      <motion.div
        variants={fade}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-base-200 p-6 rounded-xl shadow text-center"
      >
        <h2 className="text-xl font-semibold text-lime-600 mb-4">Overview Chart</h2>
        <div className="flex justify-center">
          <div className="w-60 h-60 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full flex items-center justify-center">
            <FaChartPie className="text-6xl text-gray-500" />
          </div>
        </div>
        <p className="mt-2 text-gray-500 text-sm">(Chart coming soon)</p>
      </motion.div>
                  {/* info section  */}
              <motion.div variants={fade} transition={{ duration: 0.5, delay: 0.7 }} className="bg-base-200 dark:bg-base-300 p-6 rounded-xl shadow md:col-span-2">
          <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400">Your Info</h3>
          <p className="text-sm text-base-content dark:text-base-content">
            Name: {user.displayName}<br />
            Email: {user.email}<br />
            <span className="badge bg-lime-300 text-black/60 text-lg"> Admin</span>
          </p>
        </motion.div>
            {/* info section end  */}

      {/* Admin Info */}
      <motion.div
        variants={fade}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-base-200 p-6 rounded-xl shadow"
      >
        <h3 className="text-xl font-semibold mb-2 text-lime-600">Admin Information</h3>
        <ul className="list-disc list-inside text-sm text-base-700 space-y-1">
          <li>You are currently logged in as <span className="font-semibold">Admin</span></li>
          <li>You can manage users, approve vendors, and monitor products</li>
          <li>More detailed analytics will be added soon</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
