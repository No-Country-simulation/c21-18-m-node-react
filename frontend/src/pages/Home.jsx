import React from 'react';
import PetCard from '../components/PetCard/PetCard';
import NavBar  from '../components/Navbar/Navbar';

function Home(){
    return (
        <>
            <NavBar />
            <PetCard />
        </>
    );
}

export default Home;