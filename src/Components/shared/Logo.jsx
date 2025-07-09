import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <>
            <Link to='/' className="flex items-center gap-3">
          <img
            className="ml-2  w-20 md:w-26 lg:w-40 rounded-full"
            src="/a12 logo final.png"
            alt=""
          />
          
        </Link>
        </>
    );
};

export default Logo;