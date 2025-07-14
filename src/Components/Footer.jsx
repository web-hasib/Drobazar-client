import React from 'react';
import footer from '../assets/lottie/footer.json'
import Lottie from 'lottie-react';
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import { NavLink } from 'react-router';
import Logo from './shared/Logo';


const Footer = () => {
    return (
        <div className='relative'>
              <footer
     
      className="footer footer-horizontal footer-center  text-base-content rounded pt-5 gap-4 md:gap-6 pb-5 border-t border-green-400/30 border-dashed"
    >
      <div className="flex items-center gap-3 ">
       <Logo/>
      </div>
      <div className=" text-[8px] md:text-[10px] z-50 lg:text-sm">
       
         
             <ul className="flex gap-3">
               <li>
                 <NavLink to="/">Home</NavLink>
               </li>
               <li>
                 <NavLink to="/all-items">All products</NavLink>
               </li>
               <li>
                 <NavLink to="/dashboard">Dashboard</NavLink>
               </li>
               
               <li>
                 <NavLink to="/about">About</NavLink>
               </li>
               
               <li>
                 <NavLink to="/contact">Contact</NavLink>
               </li>
         
             </ul>
         
      
      </div>
      {/* Contact Info */}
      
      <div className="text-base-content text-[8px]  md:text-[10px] lg:text-sm ">
                    <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-blue-600" />
                  <span>+880 1234 567 890</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-blue-600" />
                  <span>support@virtualbookshelf.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <span>Natore , Bangladesh</span>
                </div>
              </div>
      <nav>
          {/* Terms + Links */}
        {/* <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Resources</h3>
          <div className="flex items-center text-xs gap-2 flex-col md:flex-row">
            <a href="#" className="block hover:underline">Terms & Conditions</a>
          <a href="#" className="block hover:underline">Privacy Policy</a>
          <a href="#" className="block hover:underline">FAQs</a>
          <a href="#" className="block hover:underline">Support</a>
          </div>
        </div> */}
        {/* Social Media Links */}
        <div className="flex justify-center md:justify-end space-x-4 text-xl z-50">
          <a
            href="https://www.facebook.com/web.hasibul/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <FaFacebook />
          </a>
          <a
            href="https://x.com/Hasibul9285"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/__md_hasibul_islam__/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/-hasibul-islam-/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <FaLinkedin />
          </a>
        </div>
      </nav>
      <aside className="w-full">
        <p className="text-[6px] md:text-[10px] lg:text-sm font-thin italic text-gray-400">
          Copyright © {new Date().getFullYear()} - All right reserved by Hasib
          Industries Ltd
        </p>
      </aside>
    </footer>
           <div className='absolute bottom-0 opacity-20 w-full overflow-hidden md:h-48 lg:h-64'>
             <Lottie animationData={footer} loop={true} />
           </div>
        </div>
    );
};

export default Footer;