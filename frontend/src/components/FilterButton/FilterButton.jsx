import Btn from "./Btn";
import "./FilterButton.css";
import { useState } from "react";

const filtros = {
  gender: ["macho", "hembra"], 
  size: ["pequeño", "mediano", "grande"],
  age: ["cachorro", "adulto"]
};


// main  component
const FilterButton = () => {
  
  // Manejamos los estados de los filtros
  const [selectedFilters, setSelecterFilters] = useState({
    gender: [],
    size: [],
    age: [],
  });

  //Verificamos si el state de filtros está vacios
  const isFiltersEmpty = Object.values(selectedFilters).every(
    (filters) => filters.length === 0
  );


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
  
    console.log("Filtros seleccionados: ", selectedCategories);
  };

  return (
    <>
      <div className="div-filters">
        <div id="filters">
          {
            Object.entries(filtros).map(([key, values]) => (
            <div key={key}>
              <h3>{key}</h3>
              {values.map((value) => (
                <Btn
                  key={value}
                  text={value}
                  onClick={() => handleFilterClick(key, value)}
                />
              ))}
            </div>
          ))}
        </div>
        <div id="aplicar-btn">
          <button onClick={handleApply}>Aplicar</button>
          {
          isFiltersEmpty? (
            <p>filtros vacios</p>
          ) : (
            <p>Hay filtros seleccionados</p>
          )
          }
        </div>
      </div>
    </>
  );
}

export default FilterButton;
