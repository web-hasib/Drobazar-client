import React, { useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import SpotlightButton from "../Components/shared/Buttons/ContactButton";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const socialLinks = [
    {
      id: 1,
      icon: <FaGithub />,
      url: "https://github.com/web-hasib",
      hoverColor: "hover:text-red-500",
    },
    {
      id: 2,
      icon: <FaFacebook />,
      url: "https://www.facebook.com/web.hasibul/",
      hoverColor: "hover:text-blue-500",
    },
    {
      id: 3,
      icon: <FaTwitter />,
      url: "https://x.com/Hasibul9285",
      hoverColor: "hover:text-sky-400",
    },
    {
      id: 4,
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/-hasibul-islam-/",
      hoverColor: "hover:text-blue-400",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send("service_8kvdilu", "template_uvxcnbl", formData, "Nyx4m3XxLJU9tZ3eS")
      .then(
        (result) => {
          Swal.fire({
            icon: "success",
            title: "Email Sent!",
            text: "Your message has been sent successfully.",
          });
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again later!",
          });
        }
      );
  };

  return (
    <section
      id="contact"
      className="container mx-auto p-8 py-10 max-w-7xl w-full bg-base-100 rounded-xl overflow-hidden space-y-6 md:space-y-0 px-6 roboto text-base-content my-16"
    >
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-lime-300/60 via-lime-500/70 to-lime-300/20 text-transparent bg-clip-text pb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        custom={0}
      >
        Contact Us
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Contact Information */}
        <motion.div
          className="md:w-1/2 bg-base-200/40 p-6 rounded-lg shadow-inner flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={1}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-lime-400">
            Contact Information
          </h3>

          <div className="space-y-6 flex-grow">
            <div className="flex items-center gap-3 text-lg">
              <FiMail className="text-lime-300 text-2xl" />
              <a href="mailto:jrweb.hasib@gmail.com" className="hover:underline">
                jrweb.hasib@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <FaWhatsapp className="text-lime-300 text-2xl" />
              <a
                href="https://wa.me/8801303787940"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                +8801303787940
              </a>
            </div>
            <div className="flex items-start gap-3 text-lg">
              <FiMapPin className="text-lime-300 text-2xl mt-1 flex-shrink-0" />
              <p>Natore, Bangladesh</p>
            </div>
            <motion.div
              className="flex pt-6 justify-start space-x-4 text-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-transform duration-300 ${link.hoverColor}`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 p-4 bg-white/2 rounded-md h-32 md:h-24">
            <p className="text-gray-400 text-center flex justify-center mt-5 items-center italic">
              Feel free to reach out
            </p>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          className="md:w-1/2 bg-base-200/40 p-6 rounded-lg shadow-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={2}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-lime-400">
            Send us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-white/10 border border-lime-300/30 text-base-content/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-white/10 border border-lime-300/30 text-base-content/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-white/10 border border-lime-300/30 text-base-content/70 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all duration-300 resize-y"
              ></textarea>
            </div>

            <SpotlightButton></SpotlightButton>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
