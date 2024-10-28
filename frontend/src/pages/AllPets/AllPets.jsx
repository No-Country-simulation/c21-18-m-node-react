import { useEffect, useState } from "react";
import FilterButton from "../../components/FilterButton/FilterButton";
import Card from "../../components/PetCard/PetCard";
import * as API from "../../services/apiPetService";
import { Link } from "react-router-dom";

function randomArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

///////main component
const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [isChildActive, setIsChildActive] = useState(false);
  // Manejamos el estado de los filtros del child
  const [selectedFilters, setSelectedFilters] = useState({
    gender: [],
    size: [],
    age: [],
  });

  // Función que manejará los datos recibidos desde el hijo
  const handleChildActiveStatus = (status) => {
    setIsChildActive(status);
  };

  // Función para manejar los filtros seleccionados desde el hijo
  const handleFiltersFromChild = (filters) => {
    setSelectedFilters(filters);
  };

  // Traemos las mascotas
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

  // Filtrar las mascotas que cumplan con los filtros
  const filteredPets = pets.filter((pet) => {
    return (
      (selectedFilters.gender.length === 0 ||
        selectedFilters.gender.includes(pet.gender)) &&
      (selectedFilters.size.length === 0 ||
        selectedFilters.size.includes(pet.size)) &&
      (
        selectedFilters.age.length === 0 ||
        (selectedFilters.age.includes('CACHORRO') && pet.age < 3) ||
        (selectedFilters.age.includes('ADULTO') && pet.age >= 3)
      )
    );
  });

  return (
    <>
      <FilterButton 
      setActive={handleChildActiveStatus}
      sendFilters={handleFiltersFromChild}
      />
      <div className="card-container">
        { filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
            <Link to={`/api/pet/${pet.id}`} key={pet.id}>
            <Card
                key={pet.id}
                name={pet.name}
                age={pet.age}
                gender={pet.gender}
                size={pet.size}
                image={pet.picture}
            />
            </Link>
        ))) : pets ? (
          pets.map((pet) => (
            <Link to={`/api/pet/${pet.id}`} key={pet.id}>
            <Card
              key={pet.id}
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
    </>
  );
};

export default AllPets;


