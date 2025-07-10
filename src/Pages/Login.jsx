import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import login from "../assets/lottie/login.json";
import Lottie from "lottie-react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { Slide } from "react-awesome-reveal";

import { AuthContext } from "../provider/AuthProvider";
import { saveUserToDB } from "../api/utils";

const Login = () => {
  const { loginWithGoogle, logIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 Handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await logIn(email, password);
      const user = res.user;

      await saveUserToDB(user); // ⬅️ Update last login

      toast.success(`Welcome back, ${user.displayName || "user"}!`);
      navigate(location.state || "/");
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  // 🟢 Google login
  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle();
      const user = res.user;

      await saveUserToDB(user); // ⬅️ Save or update

      toast.success("Logged in with Google!");
      navigate(location.state || "/");
    } catch (error) {
      toast.error(`Google login failed: ${error.message}`);
    }
  };

  return (
    <Slide direction="right">
      <div className="py-20 flex flex-col items-center justify-center md:flex-row-reverse md:gap-4">
        <div>
          <Lottie style={{ height: "220px" }} animationData={login} loop={true} />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 border border-base-content/20 shadow hover:shadow-md">
          <h1 className="text-2xl pt-6 font-bold text-center text-green-500/70 hover:text-green-600 transition-all duration-300">
            Login to Your Account
          </h1>

          <form onSubmit={handleSubmit} className="card-body">
            <fieldset className="fieldset">
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
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10 mr-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="btn btn-success mt-4 border-green-300 rounded-md px-7 hover:text-white"
              >
                Login
              </button>
            </fieldset>
          </form>

          {/* Google Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleGoogleLogin}
              className="border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[20px] text-[1rem] text-[#9c8b8b] hover:bg-gray-50 transition-all duration-200 w-[calc(100%-40px)] font-bold justify-center"
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
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default Login;
