import React from 'react';
import NavBar  from '../components/Navbar/Navbar';
import Banner  from '../components/Banner/Banner';
import Main from '../components/Main/Main';

function Home(){
    return (
        <>
            <NavBar />
            <Banner  />
            <Main />
        </>
    );
}

export default Home;