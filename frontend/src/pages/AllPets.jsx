import { useEffect, useState } from "react";
import FilterButton from "../components/FilterButton/FilterButton";
import Footer from "../components/Footer/Footer";
import Card from "../components/PetCard/Card";
import * as API from "../services/apiPetService";

function randomArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const AllPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    API.getAllPets()
      .then((response) => {
        // console.log("API response:", response);
        if (response && Array.isArray(response.data)) {
          const randomPets = randomArray(response.data);
          setPets(randomPets);
        }
      })
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  //console.log(pets)

  return (
    <>
      <FilterButton />
      <div className="card-container">
        {pets ? (
          pets.map((pet) => (
            <Card
              key={pet.id}
              name={pet.name}
              age={pet.age}
              gender={pet.gender}
              size={pet.size}
              image={pet.picture}
            />
          ))
        ) : (
          <p>No hay mascotas disponibles.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllPets;
