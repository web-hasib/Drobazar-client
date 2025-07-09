import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Changed from "react-router" to "react-router-dom"
import { motion } from "framer-motion"; // Changed from "motion/react" to "framer-motion" for motion.h1
import Lottie from "lottie-react";
import { Slide } from "react-awesome-reveal";
import register from "../assets/lottie/register.json"; // Importing Lottie animation
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from 'react-toastify'; // Import for toast messages
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

// Assuming AuthContext provides Firebase auth methods
import { AuthContext } from "../provider/AuthProvider"; // Uncommented AuthContext
import { imageUpload } from "../api/utils"; // Your image upload utility

const Register = () => {
  // Use useContext to access AuthContext values
  const { createUser, updateUserProfile, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(loginWithGoogle);

  const [nameError, setNameError] = useState('');
  const [passError, setPassError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // State to store uploaded image URL
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Handle image file selection and upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setLoading(true);
      try {
        const imageUrl = await imageUpload(image);
        setUploadedImage(imageUrl);
        // toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
        setUploadedImage(null); // Clear image on error
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle user registration with email and password
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // Name validation
    if (name.length < 5) {
      setNameError('Name should be more than 5 characters');
      setLoading(false);
      return;
    } else {
      setNameError('');
    }
    // Password validation
    if (password.length < 6) {
      setPassError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPassError("Password must contain at least one lowercase letter");
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPassError("Password must contain at least one uppercase letter");
      setLoading(false);
      return;
    }
    if (!/\d/.test(password)) {
      setPassError("Password must contain at least one number");
      setLoading(false);
      return;
    }
    setPassError(''); // Clear password error if all checks pass

    // Ensure an image is uploaded
    if (!uploadedImage) {
      toast.error("Please upload a profile image.");
      setLoading(false);
      return;
    }

    try {
      // 1. Create user with email and password
      const result = await createUser(email, password);
      const user = result.user;

      // // 2. Update user profile with name and photo URL
      // const updated = await updateUserProfile(user, { displayName: name, photoURL: uploadedImage });
      // console.log('updated user:', updated);


      toast.success(`Thanks for joining us, ${name}! Registration successful.`);
      navigate('/'); // Navigate to home page

    } catch (error) {
      console.error("Registration error:", error);
      toast.error(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true); // Start loading
    try {
      await loginWithGoogle();
      toast.success("Successfully logged in with Google!");
      navigate('/'); // Navigate to home page after successful login
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(`Google login failed: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Slide direction="right">
       {/* Toast messages will appear here */}
      <div className="py-20 flex flex-col items-center justify-center md:flex-row-reverse md:gap-4">
        <div>
          <Lottie style={{ height: '200px' }} animationData={register} loop={true} />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-sm border border-base-content/20 hover:shadow-md">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1, transition: { duration: 0.4 } }} // Adjusted duration for smoother animation
            className="pt-5 text-2xl text-center font-bold"
          >
            <motion.span
              animate={{
                color: ['#ff5733', '#33ff33', '#8a33ff'],
                transition: { duration: 1, repeat: Infinity }
              }}
            >
              Register your Account
            </motion.span>
          </motion.h1>

          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Your Name"
                required
              />
              {nameError && <p className="text-xs text-red-500">{nameError}</p>}

              {/* Image Upload Section */}
              <div className='p-4 w-full m-auto rounded-lg flex-grow'>
                <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                  <div className='flex items-center gap-5 w-max mx-auto text-center'>
                    <label htmlFor="image"> {/* Added htmlFor for accessibility */}
                      <input
                        onChange={handleImageUpload}
                        className='text-sm cursor-pointer w-36 hidden'
                        type='file'
                        name='image'
                        id='image'
                        accept='image/*'
                        hidden
                      />
                      <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
                        {loading ? 'Uploading...' : 'Upload Image'} {/* Loading state for image upload */}
                      </div>
                    </label>
                    {uploadedImage && (
                      <div className='w-full'>
                        <img
                          className='w-[100px] h-[100px] object-cover rounded-full' // Added styling for image preview
                          src={uploadedImage}
                          alt='Profile'
                          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=Image+Error'; }} // Fallback for broken image
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />
              {/* Password */}
              <label className="label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                  required
                />
                <button
                  type="button" // Important: change to type="button" to prevent form submission
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10 mr-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {passError && <p className="text-xs text-red-500">{passError}</p>}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="btn btn-soft border-blue-300 rounded-md px-7 hover:text-white btn-info mt-4"
                disabled={loading} // Disable button when loading
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </fieldset>
          </form>

          <div className="flex items-center justify-center">
            <button
              onClick={handleGoogleLogin}
              className="border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[20px] text-[1rem] text-[#9c8b8b] hover:bg-gray-50 transition-all duration-200 w-[calc(100%-40px)] font-bold justify-center"
              disabled={loading} // Disable button when loading
            >
              <img
                src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
                alt="google logo"
                className="w-[23px]"
              />
              Sign in with Google
            </button>
          </div>
          <p className="py-3 pb-5 text-sm font-semibold text-accent text-center">
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default Register;
