import React from 'react';
import loading from '../assets/lottie/loading.json';
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
           
            <Lottie style={{height:'100px'}} animationData={loading} loop={true} />
        </div>
        
    );
};

export default Loading;