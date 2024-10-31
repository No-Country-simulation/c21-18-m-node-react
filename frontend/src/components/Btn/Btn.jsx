
import { useEffect, useState } from "react"
import "./Btn.css"


const Btn = ({text, onClick, reset}) => {
  // Manejamos el estado del botón
  const [isPressed, setIsPressed] = useState(false);

  // Manejamos el click en el botón para cambiar el estado y el parámetro onClick
  const handleButtonClick = () => {
    setIsPressed(true);
    onClick();
  };

  // Efecto para escuchar cambios en `reset` y restablecer `isPressed` a `false`
  useEffect(() => {
    if (reset) {
      setIsPressed(false);
    }
  }, [reset]);

  return (
    <span 
    style={{ backgroundColor: isPressed? '#ffac81' : '#fec3a6' }}
    id="btn-span" 
    onClick={handleButtonClick}
    >{text}</span>
  )
}

export default Btn;

