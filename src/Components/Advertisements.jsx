import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const fadeVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const badgeVariant = {
  hidden: { opacity: 0, scale: 0, x: 50, y: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, type: "spring", bounce: 0.4 },
  },
};

const Advertisements = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/approvedAdvertisements`)
      .then(res => setAds(res.data))
      .catch(() => console.error("Failed to fetch ads"));
  }, []);

  if (!ads.length) return null;

  return (
    <section className="py-10 px-4 bg-base-100">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeVariant}
        className="text-3xl font-bold text-center mb-14 text-lime-500"
      >
        Advertisements
      </motion.h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        loop
        className="max-w-7xl mx-auto"
      >
        {ads.map((ad, index) => (
          <SwiperSlide key={ad._id}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeVariant}
              className="bg-base-200/30 backdrop-blur-md rounded-xl shadow-lg flex flex-col-reverse md:flex-row relative items-center overflow-hidden transition duration-300 hover:shadow-xl"
            >
              {/* Animated Discount Badge */}
              <motion.span
                variants={badgeVariant}
                className="badge bg-yellow-300/30 text-black font-bold p-3 absolute top-7 right-7 z-10"
              >
                up to 50% discount
              </motion.span>

              {/* Left Content */}
              <div className="p-6 w-full lg:w-1/2 space-y-3 text-base-content">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-lime-600/60">
                  {ad.advertisementTitle}
                </h3>
                <p className="text-xs md:text-[10px] lg:text-sm text-base-content/70 italic">
                  {ad.advertisementDescription}
                </p>
                <p className="text-sm md:text-[13px]">
                  <span className="text-sm md:text-[12px] font-medium">Product:</span>{" "}
                  {ad.productName}
                </p>
                <p className="text-sm md:text-[13px]">
                  <span className="text-sm md:text-[12px] font-medium">Price:</span> ৳{" "}
                  {ad.productPrice}
                </p>
                <p className="text-xs text-base-content/40">
                  <span className="font-semibold">Vendor:</span> {ad.vendorName}
                </p>
              </div>

              {/* Right Image */}
              <div className="w-full lg:w-1/2 h-64 md:h-[300px]">
                <img
                  src={ad.productImage}
                  alt={ad.productName}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Advertisements;
