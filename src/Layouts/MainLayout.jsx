import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div> 
            <nav className=' z-50 sticky top-0'>

            <Navbar/>
            </nav>
            <main className='min-h-[calc(100vh-390px)] '>
                <Outlet></Outlet>
            </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;