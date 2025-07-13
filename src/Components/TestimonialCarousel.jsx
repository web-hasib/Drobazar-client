import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import quoteIcon from "../assets/reviewQuote.png";

const testimonials = [
  {
    id: 1,
    name: "Alamin",
    role: "Vendor at Dorbazar",
    message:
      "Dorbazar made it so easy to list my products. The interface is smooth and my sales increased quickly after joining.",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Rafi",
    role: "Customer",
    message:
      "I received my order within two days. The delivery was fast and the quality was beyond my expectations. Will order again!",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Shanta Akter",
    role: "Vendor",
    message:
      "I love the payout system on Dorbazar. It's quick and efficient, and customer support is always responsive and helpful.",
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 4,
    name: "Nayeem",
    role: "Buyer",
    message:
      "Got amazing products at such affordable prices. The browsing experience is also very smooth and mobile friendly.",
    image: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 5,
    name: "Tuli Ahmed",
    role: "Vendor",
    message:
      "After switching to Dorbazar, my product visibility improved massively. The dashboard makes it easy to track everything.",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: 6,
    name: "Rezaul Karim",
    role: "Customer",
    message:
      "Products arrived exactly as shown in the images. I’ve been recommending Dorbazar to all my friends and family!",
    image: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: 7,
    name: "Maruf Hasan",
    role: "New Seller",
    message:
      "Dorbazar gave me a platform to reach more customers. The tools provided really help small sellers like me succeed.",
    image: "https://i.pravatar.cc/150?img=17",
  },
  {
    id: 8,
    name: "Lubna Yasmin",
    role: "Customer",
    message:
      "My shopping experience has been great! Love the variety of items available and the responsive support team.",
    image: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: 9,
    name: "Zahid",
    role: "Vendor",
    message:
      "Thanks to Dorbazar, I have expanded my business reach. The platform is reliable and easy to use every day.",
    image: "https://i.pravatar.cc/150?img=19",
  },
];

const TestimonialCarousel = () => {
  return (
    <div className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl text-lime-400 font-bold mb-2">
          What <span className="text-lime-500">Our Clients</span> Say
        </h2>
        <p className="text-base-content/60  mb-10">Hear from our happy partners</p>

        {/* Navigation Buttons
        <div className="absolute top-0 right-9 flex items-center justify-between z-10">
          <div className="swiper-button-prev "></div>
          <div className="swiper-button-next"></div>
        </div> */}

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
         
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-base-300/50 h-full min-h-[260px] p-6 rounded-3xl text-left relative flex flex-col justify-between">
                <img
                  src={quoteIcon}
                  alt="quote"
                  className="w-10 h-10 absolute top-4 left-4 opacity-60"
                />
                <p className="text-sm text-base-content/60 font-semibold mb-6 mt-14 z-10 relative leading-relaxed">
                  {t.message}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <h4 className="font-semibold text-lime-700 text-sm">{t.name}</h4>
                    <p className="text-xs text-base-content/40">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
