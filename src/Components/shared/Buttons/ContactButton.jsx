import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const SpotlightButton = ({ text = "Send Email", onClick, className = "" }) => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;
      spanRef.current?.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current?.animate({ left: "50%" }, { duration: 100, fill: "forwards" });
    };

    const btn = btnRef.current;
    if (btn) {
      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (btn) {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      ref={btnRef}
      onClick={onClick}
      className={`relative overflow-hidden w-full rounded-lg px-6 py-3 font-semibold text-white bg-lime-400 transition-all duration-300 ease-in-out ${className}`}
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference">
        {text}
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40"
      />
    </motion.button>
  );
};

export default SpotlightButton;
