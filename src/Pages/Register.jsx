import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Lottie from "lottie-react";
import { Slide } from "react-awesome-reveal";
import register from "../assets/lottie/register.json";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthProvider";
import { imageUpload, saveUserToDB } from "../api/utils";

const Register = () => {
  const { createUser, updateUser, setUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nameError, setNameError] = useState('');
  const [passError, setPassError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setLoading(true);
      try {
        const imageUrl = await imageUpload(image);
        setUploadedImage(imageUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed. Try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (name.length < 5) {
      setNameError("Name should be at least 5 characters.");
      setLoading(false);
      return;
    } else {
      setNameError('');
    }

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      setPassError("Password must be 6+ chars, with uppercase, lowercase, and number.");
      setLoading(false);
      return;
    } else {
      setPassError('');
    }

    if (!uploadedImage) {
      toast.error("Please upload a profile image.");
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL: uploadedImage });

      const updatedUser = {
        ...user,
        displayName: name,
        photoURL: uploadedImage,
      };

      setUser(updatedUser);
      await saveUserToDB(updatedUser);

      toast.success(`Welcome, ${name}! Registration successful.`);
      navigate('/');
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginWithGoogle();
      const user = res.user;
      await saveUserToDB(user);
      toast.success("Logged in with Google!");
      navigate('/');
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(`Google login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Slide direction="right">
      <div className="py-20 flex flex-col items-center justify-center md:flex-row-reverse md:gap-4">
        <div>
          <Lottie style={{ height: '200px' }} animationData={register} loop={true} />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-sm border border-base-content/20 hover:shadow-md">
          <h1 className="text-2xl pt-6 font-bold text-center text-green-500/70 hover:text-green-600 transition-all duration-300">
            Register your Account
          </h1>

          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">
              {/* Name */}
              <label className="label">Name</label>
              <input name="name" type="text" className="input" placeholder="Your Name" required />
              {nameError && <p className="text-xs text-red-500">{nameError}</p>}

              {/* Image Upload */}
              <div className="p-4 pl-1 w-full m-auto rounded-lg flex-grow">
                <div className="file_upload px-5 py-2 border-2 border-dotted border-gray-300 rounded-lg">
                  <div className="flex items-center gap-5 w-max mx-auto">
                    <label htmlFor="image">
                      <input
                        onChange={handleImageUpload}
                        className="hidden"
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                      />
                      <div className="bg-lime-500 text-white border rounded font-semibold px-3 py-1 cursor-pointer hover:bg-lime-600">
                        {loading ? "Uploading..." : "Upload Image"}
                      </div>
                    </label>
                    {uploadedImage && (
                      <img
                        className="w-[100px] h-[100px] object-cover rounded-full"
                        src={uploadedImage}
                        alt="Profile"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/100x100?text=Image';
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <label className="label">Email</label>
              <input name="email" type="email" className="input" placeholder="Email" required />

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
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10 mr-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {passError && <p className="text-xs text-red-500">{passError}</p>}

              <div><a className="link link-hover">Forgot password?</a></div>

              <button
                type="submit"
                className="btn btn-success mt-4 border-green-300 rounded-md px-7 hover:text-white"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </fieldset>
          </form>

          <div className="flex items-center justify-center">
            <button
              onClick={handleGoogleLogin}
              className="border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-4 text-[1rem] text-[#9c8b8b] hover:bg-gray-50 transition-all duration-200 w-[calc(100%-40px)] font-bold justify-center"
              disabled={loading}
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
            Already have an account?{" "}
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
