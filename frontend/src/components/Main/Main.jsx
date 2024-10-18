import React, { useState, useEffect } from "react";
import './Main.css';
import PetCard from "../PetCard/PetCard";
import * as API from '../../services/apiPetService';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function randomArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

export default function Main() {
    const [pets, setPets] = useState([]);
    useEffect(() => {
        API.getAllPets()
            .then(response => {
                // console.log("API response:", response);
                if (response && Array.isArray(response.data)) {
                    const randomPets = randomArray(response.data)
                    setPets(randomPets);
                }
        })
        .catch(error => console.error("Error fetching pets:", error));
    }, []);
    return (
        <div className="main-container">
            <h3 className="subtitle"> Conocelos! </h3>
            <div className="pet-container">
            {pets.length > 0 ? (
                pets.slice(0,4).map((pet) => (
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
                ) : (
                    <p>No hay mascotas disponibles.</p>
                )}
            </div>

            <a href="/pets" className="btn"> Ver todos </a>
        </div>
    );
}