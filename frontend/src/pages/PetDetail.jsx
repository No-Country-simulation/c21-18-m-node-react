import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { getPet } from '../services/apiPetService';
import { useEffect, useState } from 'react';

function PetDetail() {
    const [pet, setPet] = useState([]);
    useEffect(() => {
       getPet(pet.id)
            .then(setPet)
    }, [pet.id]);
    return (
        <>
            <Navbar/>
            <div className="container">
                
            </div>
            <Footer />
        </>
    );
}

export default PetDetail;