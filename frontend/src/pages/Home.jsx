import React from 'react';
import PetCard from '../components/PetCard/PetCard';
import NavBar  from '../components/Navbar/Navbar';
import Banner  from '../components/Banner/Banner';

function Home(){
    return (
        <>
            <NavBar />
            <Banner  />
            <PetCard />
        </>
    );
}

export default Home;