import { useState } from "react"
import "./Btn.css"


const Btn = ({text, onClick}) => {
  // Manejamos el estado del botón
  const [isPressed, setIsPressed] = useState(false);

  // Manejamos el click en el botón para cambiar el estado y el parámetro onClick
  const handleButtonClick = () => {
    setIsPressed(true);
    onClick();
  };

  return (
    <span 
    style={{ backgroundColor: isPressed? '#ffac81' : '#fec3a6' }}
    id="btn-span" 
    onClick={handleButtonClick}
    >{text}</span>
  )
}

export default Btn