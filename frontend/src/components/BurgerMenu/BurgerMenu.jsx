import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import BurgerMenuIcon from '../../assets/bars-solid.svg';
import { extractUserDetails, logged } from '../../services/auth';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
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
            className={({ isActive }) => (isActive ? 'adopt active' : 'adopt')}
            onClick={toggleMenu}
          >
            Mascotas
          </NavLink>

          <NavLink
            to="/AboutUs"
            className={({ isActive }) => (isActive ? 'contact active' : 'contact')}
            onClick={toggleMenu}
          >
            Conócenos
          </NavLink>

          {logged() ? (
            <NavLink
              to="http://localhost:3000/api/auth/logout"
              className={({ isActive }) => (isActive ? 'logout active' : 'logout')}
            >
              <div className="flex">
                <img src={extractUserDetails().picture} alt="Foto de perfil" />
                <div className="flex-name">
                  <p>{extractUserDetails().name}</p>
                  <div>Log Out</div>
                </div>
              </div>
            </NavLink>
          ) : (
            <NavLink
              to="http://localhost:3000/api/auth/google"
              className={({ isActive }) => (isActive ? 'login active' : 'login')}
            >
              Log in
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
}
