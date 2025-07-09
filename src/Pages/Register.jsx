import React, {  use,  useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react"

import register from '../assets/lottie/register.json'
import Lottie from "lottie-react";
import { Slide } from "react-awesome-reveal";
// import { AuthContext } from "../provider/AuthProvider";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { imageUpload } from "../api/utils";


const Register = () => {

  // const {createUser,setUser,updateUser,loginWithGoogle} =use(AuthContext)
// const {createUser,user}= use(AuthContext);

  const [nameError, setNameError] = useState('')
  const [passError, setPassError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  // const navigate = useNavigate()
  // console.log(loginWithGoogle);
      // image url response from imgbb
    const handleImageUpload = async (e) => {

      e.preventDefault();
      
      const image = e.target?.image?.files[0]
      return console.log(image);
      // const imageUrl = await imageUpload(image)
      // setUploadedImage(imageUrl)
    }
  const handleRegister = (e) => {
    e.preventDefault();
    const form= e.target;
    const name = form.name.value;
    if(name.length < 5){
      setNameError('Name should be more then 5 char')
      return
    }
    else{
      setNameError('')
    }
    
    const email = form.email.value;
    const password = form.password.value;
    



    // console.log(name,image,email,password);
    if(password.length <6){
      setPassError("Password must be equal or greater than 6")
      return;
  }
 
  if(!/[a-z]/.test(password)){
      setPassError("password must contain at least one lower case letter")
      return
  }
  if(!/[A-Z]/.test(password)){
      setPassError("password must contain at least one upper case letter")
      return
  }
  if(!/\d/.test(password)){
      setPassError("password must contain at least one number")
      return
  }
  
  setPassError('');

  // createUser(email,password).then((res)=>{
  //   const user = res.user

  //   // add data to database
  //   fetch('https://recipe-book-server-gold.vercel.app/users',{
  //     method: 'POST',
  //     headers:{
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       image
  //     })
  //   })
    

  //   // console.log(user);
  //   updateUser({displayName: name , photoURL: image}).then(()=>{
  //     // setUser(user)
  //     setUser({...user,displayName: name , photoURL: image })

  //     navigate('/')
  //   })
  //   .catch((error)=>{
  //     Swal.fire({
  //       icon: 'error', 
  //       title: 'Oops...',
  //       text: error.message,
  //       footer: '<a href="">Why do I have this issue?</a>'
  //     })
  //     //
  //     setUser(user)
  //   })
  //   setUser(user)
  //   // alert(`thanks for joining us ${name}`)
  //     Swal.fire({
  //       icon: 'success', 
  //       title: `Thanks for joining us ${name}`,
        
       
  //     })

  // }).catch((error)=>{
  //   // toast.error(error.message);
  //    Swal.fire({
  //       icon: 'error', 
  //       title: 'Oops...',
  //       text: error.message,
  //       footer: '<a href="">Why do I have this issue?</a>'
  //     })
  // });

    // console.log(name,image,email,password);
  };

// console.log(createUser);
  const handleGoogleLogin= ()=>{
      // loginWithGoogle()
      // .then((res) => {
      //   Swal.fire({
      //   icon: 'success', 
      //   title: 'Thanks for joining us',
      //   text: 'login successfully',
       
      // })
      // })
      // .catch((error) => {
      //    Swal.fire({
      //   icon: 'error', 
      //   title: 'Oops...',
      //   text: error.message,
      //   footer: '<a href="">Why do I have this issue?</a>'
      // })
      // });
  }
  return (
    <Slide direction="right">

    <div className="py-20 flex flex-col items-center justify-center md:flex-row-reverse md:gap-4">
      <div>
         <Lottie style={{height:'200px'}} animationData={register} loop={true} />
      </div>

       <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-sm border border-base-content/20 hover:shadow-md">
        <motion.h1 initial={{scale:0.9}} animate={{ scale:1 , transition:{duration:4} }} className="pt-5 text-2xl text-center font-bold"> <motion.span 
           animate={{color:['#ff5733','#33ff33','#8a33ff'],
            transition:{duration:1 ,repeat:Infinity}
           }}
           >Register your Account</motion.span></motion.h1>

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
              {/* img url 
              <label className="label">Photo URL</label>
              <input
                name="image"
                type="text"
                className="input"
                placeholder="Image URL"
                required
              /> */}
                  {/* Image */}
            <div className=' p-4  w-full  m-auto rounded-lg flex-grow'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex items-center gap-5 w-max mx-auto text-center'>
                  <label>
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
                      Upload
                    </div>
                  </label>
                  {uploadedImage && (
                    <div className='w-full'>
                      <img
                        className='w-[100px]'
                        src={uploadedImage}
                        alt='plant image'
                      />
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
              {/* email  */}
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />
              {/* password  */}
              <label className="label">Password</label>
              <div className="relative">

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Password"
                required
                
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10 mr-5" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
              </div>
              {passError && <p className="text-xs text-red-500">{passError}</p>}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              
              <button type="submit" className="btn btn-soft border-blue-300 rounded-md px-7 hover:text-white btn-info mt-4">
                Register
              </button>
            </fieldset>
           
          </form>
           
          <div className="flex items-center justify-center">
              <button onClick={handleGoogleLogin} className=" border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[20px] text-[1rem] text-[#9c8b8b] hover:bg-gray-50 transition-all duration-200 w-[calc(100%-40px)] font-bold  justify-center">
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
