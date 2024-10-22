
import Btn from "./Btn";
import "./FilterButton.css";
import { useState } from "react";

// constante
const filtros = {
  gender: ["MALE", "FEMALE"], 
  size: ["SMALL", "MEDIUM", "LARGE"],
  age: ["PUPPY", "ADULT"]
};

///////// main  component
const FilterButton = ({setActive, sendFilters}) => {
  
  // Manejamos los estados de los filtros
  const [selectedFilters, setSelecterFilters] = useState({
    gender: [],
    size: [],
    age: [],
  });

  // aply btn function
  const handleClick = () => {
    toggleActive();
    handleApply();
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
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              <div id="span-container">
                {values.map((value) => (
                  <Btn
                  key={value}
                  text={value}
                  onClick={() => handleFilterClick(key, value)}
                  />
                ))}
              </div>
            </div>
          ))
          }
        </div>
        <div id="aplicar-btn">
          <button onClick={handleClick}>Aplicar</button>
        </div>
      </div>
    </>
  );
}

export default FilterButton;

