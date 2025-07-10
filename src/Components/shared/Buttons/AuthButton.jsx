import React from 'react';
// import './AuthButton.css'; // Import the custom CSS

const AuthButton = ({ onClick, lable = 'Go Back' }) => {
  return (
     <button
      onClick={onClick}
      className="relative inline-flex font-semibold items-center w-full lg:w-auto justify-center px-6 py-2 rounded-2xl border border-lime-600/70 hover:border-green-100/70 hover:text-white bg-green-400/5 text-lime-600 overflow-hidden group"
    >
      <span className="absolute inset-0 bg-lime-600/70 transition-transform duration-300 scale-x-0 origin-left group-hover:scale-x-100"></span>
      <span className="relative z-10">{lable}</span>
    </button>
  );
};

export default AuthButton;
