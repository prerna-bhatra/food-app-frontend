
import React, { useState } from 'react';
import MainService from './MainService';
import Footer from './Footer';
import AppSection from './AppSection';
import CategoriesSection from './CategoriesSection';
import PopularSection from './PopularSection';


const Home: React.FC = () => {
    //hooks

    return(
        <div>
            <MainService/>
            <PopularSection/>
            <CategoriesSection/>
            <AppSection/>
            <Footer/>
        </div>
    )

}

export default Home