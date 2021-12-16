import React from 'react'
import Navbar from './../../components/Navbar/Navbar'
import Banner from './../../components/Banner/Banner'
import Carousal from './../../components/Carousal/Carousal'
import Footer from  './../../components/Footer/Footer'
import HomepageMenu from './../../components/HomepageMenu/HomepageMenu';

const Home = () => {
    return (
        <>
            <Navbar/>
            <Banner/>
            <Carousal/>
            <HomepageMenu/>
            <Footer/>            
        </>
    )
}

export default Home;
