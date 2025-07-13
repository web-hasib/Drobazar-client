import { motion } from "framer-motion";
import { FaBoxOpen, FaRegClock, FaStar, FaUpload, FaChartBar, FaEye, FaRocket, FaMoneyBillWave, FaCalendarCheck, FaClipboardList } from "react-icons/fa";
import CountUp from "react-countup";
import { use } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const VendorDashboard = () => {
    const {user} = use(AuthContext);
  const stats = {
    totalProducts: 18,
    pendingProducts: 5,
    totalReviews: 73,
    uploadedToday: 2,
    monthlyViews: 1240,
    averageRating: 4.3,
    conversionRate: 12.6,
    revenue: 15800,
    ordersFulfilled: 47,
    pendingTasks: 3,
  };

  const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Base card styles with dark mode support
  const cardBase = "backdrop-blur-md bg-base-200/40 dark:bg-base-300/30 text-base-content dark:text-base-content p-6 rounded-xl shadow-md flex items-center gap-4 transition-all duration-300 hover:shadow-lg";

  // Hover background overlay colors with transparency for each stat card
  const hoverBgColors = {
    totalProducts: "hover:bg-teal-500/20",
    pendingProducts: "hover:bg-orange-500/20",
    totalReviews: "hover:bg-yellow-400/20",
    uploadedToday: "hover:bg-indigo-500/20",
    monthlyViews: "hover:bg-sky-500/20",
    averageRating: "hover:bg-rose-500/20",
    conversionRate: "hover:bg-lime-500/20",
    revenue: "hover:bg-green-600/20",
    ordersFulfilled: "hover:bg-cyan-500/20",
    pendingTasks: "hover:bg-violet-500/20",
  };

  // Icons color classes
  const iconColors = {
    totalProducts: "text-teal-600",
    pendingProducts: "text-orange-600",
    totalReviews: "text-yellow-500",
    uploadedToday: "text-indigo-600",
    monthlyViews: "text-sky-600",
    averageRating: "text-rose-600",
    conversionRate: "text-lime-600",
    revenue: "text-green-600",
    ordersFulfilled: "text-cyan-600",
    pendingTasks: "text-violet-600",
  };

  return (
    <motion.div
      className="space-y-10 px-4 py-6 max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={fade}
      transition={{ duration: 0.6 }}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <motion.div className={`${cardBase} ${hoverBgColors.totalProducts}`}>
          <FaBoxOpen className={`text-3xl ${iconColors.totalProducts}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.totalProducts} />
            </p>
            <p className="text-sm">Total Products</p>
          </div>
        </motion.div>

        <motion.div className={`${cardBase} ${hoverBgColors.pendingProducts}`}>
          <FaRegClock className={`text-3xl ${iconColors.pendingProducts}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.pendingProducts} />
            </p>
            <p className="text-sm">Pending Products</p>
          </div>
        </motion.div>

        <motion.div className={`${cardBase} ${hoverBgColors.totalReviews}`}>
          <FaStar className={`text-3xl ${iconColors.totalReviews}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.totalReviews} />
            </p>
            <p className="text-sm">Total Reviews</p>
          </div>
        </motion.div>

        <motion.div className={`${cardBase} ${hoverBgColors.uploadedToday}`}>
          <FaUpload className={`text-3xl ${iconColors.uploadedToday}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.uploadedToday} />
            </p>
            <p className="text-sm">Uploaded Today</p>
          </div>
        </motion.div>

        <motion.div className={`${cardBase} ${hoverBgColors.monthlyViews}`}>
          <FaEye className={`text-3xl ${iconColors.monthlyViews}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.monthlyViews} />
            </p>
            <p className="text-sm">Monthly Views</p>
          </div>
        </motion.div>

        <motion.div className={`${cardBase} ${hoverBgColors.averageRating}`}>
          <FaChartBar className={`text-3xl ${iconColors.averageRating}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.averageRating} decimals={1} />
            </p>
            <p className="text-sm">Avg Rating</p>
          </div>
        </motion.div>

        <motion.div className={`${cardBase} ${hoverBgColors.conversionRate}`}>
          <FaRocket className={`text-3xl ${iconColors.conversionRate}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.conversionRate} decimals={1} suffix="%" />
            </p>
            <p className="text-sm">Conversion Rate</p>
          </div>
        </motion.div>

        <motion.div className={`${cardBase} ${hoverBgColors.revenue}`}>
          <FaMoneyBillWave className={`text-3xl ${iconColors.revenue}`} />
          <div>
            <p className="text-xl font-bold">
              ৳<CountUp end={stats.revenue} />
            </p>
            <p className="text-sm">Monthly Revenue</p>
          </div>
        </motion.div>

        <motion.div className={`${cardBase} ${hoverBgColors.ordersFulfilled}`}>
          <FaCalendarCheck className={`text-3xl ${iconColors.ordersFulfilled}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.ordersFulfilled} />
            </p>
            <p className="text-sm">Orders Fulfilled</p>
          </div>
        </motion.div>

        <motion.div className={`${cardBase} ${hoverBgColors.pendingTasks}`}>
          <FaClipboardList className={`text-3xl ${iconColors.pendingTasks}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.pendingTasks} />
            </p>
            <p className="text-sm">Pending Tasks</p>
          </div>
        </motion.div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={fade} transition={{ duration: 0.5, delay: 0.3 }} className="bg-base-200 dark:bg-base-300 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2 text-emerald-700 dark:text-emerald-400">Welcome, Vendor!</h3>
          <p className="text-sm text-base-content dark:text-base-content">This dashboard gives you a snapshot of your store’s performance. Stay informed and make data-driven decisions to grow your business.</p>
        </motion.div>

        <motion.div variants={fade} transition={{ duration: 0.5, delay: 0.4 }} className="bg-base-200 dark:bg-base-300 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-400">Growth Suggestions</h3>
          <p className="text-sm text-base-content dark:text-base-content">Run promotions for slow products, try A/B testing thumbnails, and upload during peak traffic times.</p>
        </motion.div>

        <motion.div variants={fade} transition={{ duration: 0.5, delay: 0.5 }} className="bg-base-200 dark:bg-base-300 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2 text-orange-700 dark:text-orange-400">Platform Updates</h3>
          <p className="text-sm text-base-content dark:text-base-content">
            🚀 New analytics dashboard released!<br />
            🛠 Maintenance: 20th July, 2–4 AM UTC.
          </p>
        </motion.div>

        <motion.div variants={fade} transition={{ duration: 0.5, delay: 0.6 }} className="bg-base-200 dark:bg-base-300 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2 text-pink-700 dark:text-pink-400">Vendor Feedback</h3>
          <p className="text-sm italic text-base-content dark:text-base-content">
            “The dashboard helps us track performance easily.” – StudioKraft<br />
            “We doubled sales using the weekly tips!” – PixelShop
          </p>
        </motion.div>

            {/* info section  */}
              <motion.div variants={fade} transition={{ duration: 0.5, delay: 0.7 }} className="bg-base-200 dark:bg-base-300 p-6 rounded-xl shadow md:col-span-2">
          <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400">Your Info</h3>
          <p className="text-sm text-base-content dark:text-base-content">
            Name: {user.displayName}<br />
            Email: {user.email}<br />
            <span className="badge bg-lime-300 text-black/60 text-lg"> Vendor</span>
          </p>
        </motion.div>
            {/* info section end  */}

        <motion.div variants={fade} transition={{ duration: 0.5, delay: 0.7 }} className="bg-base-200 dark:bg-base-300 p-6 rounded-xl shadow md:col-span-2">
          <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400">Weekly Highlights</h3>
          <p className="text-sm text-base-content dark:text-base-content">
            🔼 Top Product: “EcoSmart Bottle” (320 views)<br />
            ⭐ Best Rating: “Mini Desk Lamp” (4.9/5)<br />
            💡 Tip: Schedule campaigns over weekends for better conversions.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VendorDashboard;
