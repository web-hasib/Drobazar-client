import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import login from "../assets/lottie/login.json";
import { motion } from "motion/react";
import { Slide } from "react-awesome-reveal";


// import { AuthContext } from "../provider/AuthProvider";
import Lottie from "lottie-react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  // const { loginWithGoogle, logIn } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  // const location = useLocation();
  // const Navigate = useNavigate();
  // console.log(location);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    // logIn(email, password)
    //   .then((res) => {
    //     const user = res.user;
    //     // alert(`Thank you for joining us ${user.displayName}`);
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: `Thank you for joining us ${user.displayName}`,
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     // console.log(user);
    //     Navigate(`${location.state ? location.state : "/"}`);
    //   })
    //   .catch((error) => {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: `${error.message}`,
    //     });
    //     Navigate("/");
    //   });
  };
  const handleGoogleLogin = () => {
    // loginWithGoogle()
    //   .then((res) => {
    //     // console.log(res.user);
    //     // alert("Thank you for joining us");
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: `Thank you for joining us !`,
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });

    //     Navigate(`${location.state ? location.state : "/"}`);
    //   })
    //   .catch((error) => {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: `${error.message}`,
    //     });
    //     Navigate("/");
    //   });
  };
  return (
    <Slide direction="right">
     
      <div className="py-20 flex flex-col items-center justify-center md:flex-row-reverse md:gap-4">
        <div>
          <Lottie
            style={{ height: "220px" }}
            animationData={login}
            loop={true}
          />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 border border-base-content/20 shadow hover:shadow-md">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1, transition: { duration: 4 } }}
            className="pt-5 text-2xl text-center font-bold"
          >
            {" "}
            <motion.span
              animate={{
                color: ["#ff5733", "#33ff33", "#8a33ff"],
                transition: { duration: 1, repeat: Infinity },
              }}
            >
              Login your Account
            </motion.span>
          </motion.h1>
          <form onSubmit={handleSubmit} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />
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
                className="btn btn-soft border-blue-300 rounded-md px-7 hover:text-white btn-info mt-4"
              >
                Login
              </button>
            </fieldset>
          </form>
          <div className="flex items-center justify-center">
            <button
              onClick={handleGoogleLogin}
              className=" border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[20px] text-[1rem] text-[#9c8b8b] hover:bg-gray-50 transition-all duration-200 w-[calc(100%-40px)] font-bold  justify-center"
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
            Don't have an account ?{" "}
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
