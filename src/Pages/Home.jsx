import React from 'react';
import Hero from '../Components/Hero';
import ProductCard from '../Components/cards/ProductCard';
import TopProduct from '../Components/TopProduct';
import Advertisements from '../Components/Advertisements';
import TestimonialCarousel from '../Components/TestimonialCarousel';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <section className='max-w-7xl mx-auto px-2 md:px-4'>
           <Advertisements></Advertisements>
            <TopProduct></TopProduct>
            <TestimonialCarousel></TestimonialCarousel>
           {/* <ProductCard></ProductCard> */}
            </section>

        </div>
    );
};

export default Home;