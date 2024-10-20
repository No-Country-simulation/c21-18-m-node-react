import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import BurgerMenuIcon from '../../assets/bars-solid.svg';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-menu-container">
      <button className="burger-menu-button" onClick={toggleMenu}>
      <img className="burgerMenu" src={BurgerMenuIcon} alt="Menú de hamburguesa" />
      </button>
      {isOpen && (
        <div className="burger-menu-dropdown">
          <NavLink 
            to="/AllPets" 
            className={({ isActive }) => isActive ? "adopt active" : "adopt"}
            onClick={toggleMenu}
          >
            Mascotas
          </NavLink>
          <NavLink 
            to="/AboutUs" 
            className={({ isActive }) => isActive ? "contact active" : "contact"}
            onClick={toggleMenu}
          >
            Conócenos
          </NavLink>
          <NavLink 
            to="/logIn" 
            className={({ isActive }) => isActive ? "login active" : "login"}
            onClick={toggleMenu} 
          >
            Log in
          </NavLink>
        </div>
      )}
    </div>
  );
}
