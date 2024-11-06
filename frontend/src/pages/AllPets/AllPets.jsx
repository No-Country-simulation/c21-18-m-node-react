import { useEffect, useState } from "react";
import FilterButton from "../../components/FilterButton/FilterButton";
import Card from "../../components/PetCard/PetCard";
import * as API from "../../services/apiPetService";
import { Link } from "react-router-dom";
import { SkeletonCard } from "../../components/PetCard/SkeletonCard";

function randomArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [isChildActive, setIsChildActive] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    gender: [],
    size: [],
    age: [],
  });

  const handleChildActiveStatus = (status) => {
    setIsChildActive(status);
  };

  const handleFiltersFromChild = (filters) => {
    setSelectedFilters(filters);
  };

  useEffect(() => {
    setLoading(true);
    API.getAllPets()
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          const randomPets = randomArray(response.data);
          setPets(randomPets);
        }
      })
      .catch((error) => console.error("Error fetching pets:", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredPets = pets.filter((pet) => {
    return (
      (selectedFilters.type.length === 0 ||
        selectedFilters.type.includes(pet.type)) &&
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
    <div className="main-container">
      <FilterButton 
        setActive={handleChildActiveStatus}
        sendFilters={handleFiltersFromChild}
      />
      <div className="pet-container">
        {loading ? ( //
          Array(4).fill().map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <Link to={`/api/pet/${pet.id}`} key={pet.id}>
              <Card
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
    </div>
  );
};

export default AllPets;

