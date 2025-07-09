import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hero from '../../public/hero.png'
import hero2 from '../../public/hero2.png'
import hero3 from '../../public/hero3.png'

const Hero = () => {
    // Text for the typewriter effect
    const textToType = "Track Local Market Prices, Smarter.";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    // Array of hero images
    const images = [hero, hero2, hero3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Typewriter effect logic
    useEffect(() => {
        if (index < textToType.length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + textToType[index]);
                setIndex((prev) => prev + 1);
            }, 50);
            return () => clearTimeout(timeoutId);
        }
    }, [index, textToType]);

    // Image carousel logic: cycle through images every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds (adjust as needed)
        return () => clearInterval(intervalId);
    }, [images.length]);

    // Framer Motion variants for staggered text animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    // Framer Motion variants for individual text elements
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    // Framer Motion variants for enhanced image transitions
    const imageVariants = {
        enter: { opacity: 0, scale: 0.8, y: 20 }, // Image enters from slightly smaller, lower, and transparent
        center: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }, // Image is fully visible, normal size, and in place
        exit: { opacity: 0, scale: 1.2, y: -20, transition: { duration: 1, ease: "easeIn" } }, // Image exits by becoming larger, higher, and transparent
    };

    return (
        // Main hero section container with original gradient background and rounded corners
        <section className="relative bg-gradient-to-r from-green-400/4 to-lime-400/4 text-white min-h-[60vh] xl:min-h-[40vh] 2xl:min-h-[20vh] flex items-center justify-center py-16 px-4 overflow-hidden font-sans">
           

            {/* Content container for text and image, centered and responsive */}
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between z-10 max-w-7xl">
                {/* Left Section: Text Content */}
               <motion.div
                    className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 p-4"
                    variants={containerVariants} // Apply container variants for staggered animation
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="text-gray-400 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold leading-tight mb-4 p-2 inline-block"
                        variants={itemVariants} // Apply item variants for individual animation
                    >
                        Dorbazar: <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-lime-500/80">{displayedText}</span>
                    </motion.h1>
                    <motion.p
                        className="text-xs text-base-content/40 md:text-lg italic mb-8 max-w-md mx-auto lg:mx-0 rounded-md p-2"
                        variants={itemVariants} 
                    >
                        Your ultimate guide to daily local market prices. Compare, track, and save on essential items.
                    </motion.p>
                    <motion.button
                        className="bg-white text-green-700 hover:bg-green-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-75"
                        variants={itemVariants} // Apply item variants
                        whileHover={{ scale: 1.05 }} // Scale up on hover
                        whileTap={{ scale: 0.95 }} // Scale down on tap/click
                    >
                        Explore Products
                    </motion.button>
                   
                </motion.div>

                {/* Right Section: Image Carousel */}
                <motion.div
                    className="lg:w-1/2 flex justify-center p-4 relative"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex} // Key is crucial for AnimatePresence to detect changes
                            src={images[currentImageIndex]}
                            alt="Fresh Produce Market"
                            className="w-auto h-60 md:h-80 object-cover"
                            variants={imageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            // No explicit transition here, as it's defined within imageVariants
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/000000?text=Image+Not+Found'; }}
                        />
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
