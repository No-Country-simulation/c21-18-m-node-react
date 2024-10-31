
import Btn from "../Btn/Btn";
import "./FilterButton.css";
import { useState } from "react";

// constante
const filtros = {
  type: ["PERRO", "GATO"],
  gender: ["MACHO", "HEMBRA"], 
  size: ["CHICO", "MEDIANO", "GRANDE"],
  age: ["CACHORRO", "ADULTO"]
};

///////// main  component
const FilterButton = ({setActive, sendFilters}) => {
  // Estado para resetear cata componente Btn
  const [resetCounter, setResetCounter] = useState(0);
  
  // Manejamos los estados de los filtros
  const [selectedFilters, setSelecterFilters] = useState({
    type: [],
    gender: [],
    size: [],
    age: [],
  });

  const translations = {
    type: 'Especie',
    gender : 'Género',
    size: 'Tamaño',
    age: 'Edad',
  }


  // aply btn function
  const handleClick = () => {
    toggleActive();
    handleApply();
    setResetCounter((prev) => prev + 1);
  }

  const toggleActive = () => {
    // cambia el estado activo/no activo en el padre
    setActive((prevStatus) => !prevStatus)
  }
  

  // Manejamos los click en los dif filtros
  const handleFilterClick = (category, filtro) => {
    setSelecterFilters((prevSelected) => {
      const updatedCategory = prevSelected[category].includes(filtro)
        ? prevSelected[category].filter((f) => f !== filtro)
        : [...prevSelected[category], filtro];
  
      return {
        ...prevSelected,
        [category]: updatedCategory,
      };
    });
  };

  // Enviar los filtros a state
  const handleApply = () => {
    const selectedCategories = Object.entries(selectedFilters).reduce(
      (acc, [category, filters]) => {
        if (filters.length > 0) {
          acc[category] = filters;
        }
        return acc;
      },
      {}
    );

    // Enviar los filtros seleccionados al padre
    sendFilters(selectedFilters);

    console.log("Filtros seleccionados: ", selectedCategories);

    setSelecterFilters({
      type: [],
      gender: [],
      size: [],
      age: [],
    })
  };

  return (
    <>
      <div className="div-filters">
        <div id="filters">
          {
            Object.entries(filtros).map(([key, values]) => (
            <div id="div-category" key={key}>
              <h3>{translations[key] || key}</h3>
              <div id="span-container">
                {values.map((value) => (
                  <Btn
                  key={value}
                  text={value}
                  reset={resetCounter}
                  onClick={() => handleFilterClick(key, value)}
                  />
                ))}
              </div>
            </div>
          ))
          }
        </div>
        <div id="aplicar-btn">
          <button onClick={handleClick}>Buscar</button>
        </div>
      </div>
    </>
  );
}

export default FilterButton;

