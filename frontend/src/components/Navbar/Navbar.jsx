import Paw from '../../assets/paw-solid.svg'
import BurgerMenu from '../../assets/bars-solid.svg'
import './Navbar.css'
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="nav-container">
      <img className="logo" src={Paw} alt="Logo" />
      <nav>
        {isMobile ? (
          <img className="burgerMenu" src={BurgerMenu} alt="Menú de hamburguesa" />
        ) : (

          <div className="desktop-menu">
            <a href="#adopt" className="Adopt">Adoptar</a>
            <a href="#contact" className="contact">Conócenos</a>
            <a href="#login" className="login">Log in</a>
          </div>
        )}
      </nav>
    </div>
  );
}