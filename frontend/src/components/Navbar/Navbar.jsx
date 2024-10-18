import Paw from '../../assets/paw-solid.svg';
import BurgerMenu from '../../assets/bars-solid.svg';
import './Navbar.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

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
      <NavLink to="/" className="logo-link">
        <img className="logo" src={Paw} alt="Logo" />
      </NavLink>
      <nav>
        {isMobile ? (
          <img className="burgerMenu" src={BurgerMenu} alt="Menú de hamburguesa" />
        ) : (
          <div className="desktop-menu">
            <NavLink 
              to="/AllPets" 
              className={({ isActive }) => isActive ? "adopt active" : "adopt"}
            >
              Adoptar
            </NavLink>
            <NavLink 
              to="/AboutUs" 
              className={({ isActive }) => isActive ? "contact active" : "contact"}
            >
              Conócenos
            </NavLink>
            <NavLink 
              to="/logIn" 
              className={({ isActive }) => isActive ? "login active" : "login"}
            >
              Log in
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}
