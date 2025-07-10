import React from 'react';

import error from '../assets/error.webp';
import AuthButton from '../Components/shared/Buttons/AuthButton';
import { motion } from 'motion/react';

const Error = () => {
  const handleGoBack = () => {
    window.history.back(); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100/20 text-center p-6">
     <motion.img
  src={error}
  alt="Error"
  className="max-w-md w-full mb-6"
  initial={{ y: 0 }}
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 2,
    repeat: Infinity,
    repeatType: 'loop',
    ease: 'easeInOut',
  }}
/>


      <motion.h1
        className="text-3xl font-bold text-lime-700 mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Oops! Page not found
      </motion.h1>

      <motion.p
        className="text-lime-600 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        The page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <AuthButton onClick={handleGoBack}>
          Go Back
        </AuthButton>
      </motion.div>
    </div>
  );
};

export default Error;
