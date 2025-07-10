import React from 'react';
import Hero from '../Components/Hero';
import ProductCard from '../Components/cards/ProductCard';
import TopProduct from '../Components/TopProduct';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <section className='max-w-7xl mx-auto px-2 md:px-4'>
            <TopProduct></TopProduct>
           <ProductCard></ProductCard>
            </section>

        </div>
    );
};

export default Home;