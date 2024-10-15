import React from 'react';
import NavBar  from '../components/Navbar/Navbar';
import Banner  from '../components/Banner/Banner';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';

function Home(){
    return (
        <>
            <NavBar />
            <Banner  />
            <Main />
            <Footer />
        </>
    );
}

export default Home;