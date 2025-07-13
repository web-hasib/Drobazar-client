import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaRegCommentDots,
  FaHeart,
  FaBell,
} from "react-icons/fa";

const UsersDashboard = () => {
  // Replace these stats with your actual data
  const stats = {
    totalUsers: 3200,
    activeUsers: 1540,
    newSignupsToday: 25,
    totalReviews: 112,
    totalLikes: 5300,
    notificationsSent: 1250,
  };

  const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const cardBase =
    "backdrop-blur-md bg-base-200/40 dark:bg-base-300/30 text-base-content dark:text-base-content p-6 rounded-xl shadow-md flex items-center gap-4 transition-all duration-300 hover:shadow-lg";

  const hoverBgColors = {
    totalUsers: "hover:bg-blue-500/20",
    activeUsers: "hover:bg-green-500/20",
    newSignupsToday: "hover:bg-indigo-500/20",
    totalReviews: "hover:bg-yellow-500/20",
    totalLikes: "hover:bg-pink-500/20",
    notificationsSent: "hover:bg-purple-500/20",
  };

  const iconColors = {
    totalUsers: "text-blue-600",
    activeUsers: "text-green-600",
    newSignupsToday: "text-indigo-600",
    totalReviews: "text-yellow-600",
    totalLikes: "text-pink-600",
    notificationsSent: "text-purple-600",
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
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${cardBase} ${hoverBgColors.totalUsers}`}
        >
          <FaUsers className={`text-4xl ${iconColors.totalUsers}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.totalUsers} duration={1.5} />
            </p>
            <p className="text-sm font-medium">Total Users</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${cardBase} ${hoverBgColors.activeUsers}`}
        >
          <FaUserCheck className={`text-4xl ${iconColors.activeUsers}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.activeUsers} duration={1.5} />
            </p>
            <p className="text-sm font-medium">Active Users</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${cardBase} ${hoverBgColors.newSignupsToday}`}
        >
          <FaUserPlus className={`text-4xl ${iconColors.newSignupsToday}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.newSignupsToday} duration={1.5} />
            </p>
            <p className="text-sm font-medium">New Signups Today</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${cardBase} ${hoverBgColors.totalReviews}`}
        >
          <FaRegCommentDots className={`text-4xl ${iconColors.totalReviews}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.totalReviews} duration={1.5} />
            </p>
            <p className="text-sm font-medium">Total Reviews</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${cardBase} ${hoverBgColors.totalLikes}`}
        >
          <FaHeart className={`text-4xl ${iconColors.totalLikes}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.totalLikes} duration={1.5} />
            </p>
            <p className="text-sm font-medium">Total Likes</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${cardBase} ${hoverBgColors.notificationsSent}`}
        >
          <FaBell className={`text-4xl ${iconColors.notificationsSent}`} />
          <div>
            <p className="text-xl font-bold">
              <CountUp end={stats.notificationsSent} duration={1.5} />
            </p>
            <p className="text-sm font-medium">Notifications Sent</p>
          </div>
        </motion.div>
      </div>

      {/* Info Sections */}
      <motion.div
        variants={fade}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-base-200 dark:bg-base-300 p-6 rounded-xl shadow"
      >
        <h3 className="text-xl font-semibold mb-2 text-blue-600">Welcome, Users!</h3>
        <p className="text-sm text-base-content/60">
          This dashboard helps you track user engagement, monitor feedback, and stay updated on new signups. Use this data to understand your community better and foster growth.
        </p>
      </motion.div>

      <motion.div
        variants={fade}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-base-200 dark:bg-base-300 p-6 rounded-xl shadow"
      >
        <h3 className="text-xl font-semibold mb-2 text-indigo-600">Engagement Tips</h3>
        <p className="text-sm text-base-content/60">
          Encourage users to provide feedback regularly and recognize active members to build a healthy community. Consider sending notifications during peak usage times.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default UsersDashboard;
