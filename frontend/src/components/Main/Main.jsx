import { useState, useEffect } from "react";
import './Main.css';
import PetCard from "../PetCard/PetCard";
import * as API from '../../services/apiPetService';
import { Link } from "react-router-dom";
import { SkeletonCard } from "../PetCard/SkeletonCard";


function randomArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

export default function Main() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        API.getAllPets()
            .then(response => {
                (response && Array.isArray(response.data)); {
                    const randomPets = randomArray(response.data)
                    setPets(randomPets);
                }
            })
            .catch(error => console.error("Error fetching pets:", error))
            .finally(() => setLoading(false));
    }, []);
    // if (loading) return <SkeletonCard/>;
    return (
        <div className="main-container">
            <h3 className="subtitle"> Conócelos! </h3>
            <div className="pet-container">
                {loading ? (
                    // Render multiple SkeletonCards while loading
                    Array(4).fill().map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                ) : (
                    // Render PetCards once data is loaded
                    pets.slice(0, 4).map((pet) => (
                        <Link to={`/api/pet/${pet.id}`} key={pet.id}>
                            <PetCard
                                name={pet.name}
                                age={pet.age}
                                gender={pet.gender}
                                size={pet.size}
                                image={pet.picture}
                            />
                        </Link>
                    ))
                )}
            </div>
            <a href="/AllPets" className="btn"> Ver todos </a>
        </div>
    );
}