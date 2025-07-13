import React from 'react';
import Hero from '../Components/Hero';
import ProductCard from '../Components/cards/ProductCard';
import TopProduct from '../Components/TopProduct';
import Advertisements from '../Components/Advertisements';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <section className='max-w-7xl mx-auto px-2 md:px-4'>
            <TopProduct></TopProduct>
           {/* <ProductCard></ProductCard> */}
           <Advertisements></Advertisements>
            </section>

        </div>
    );
};

export default Home;