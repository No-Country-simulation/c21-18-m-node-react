import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import BurgerMenuIcon from '../../assets/bars-solid.svg';
import { extractUserDetails, logged } from '../../services/auth';
const  URL = import.meta.env.VITE_BACKEND_URL

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const user = logged() ? extractUserDetails() : null;
  const isAdmin = user && user.role === "ADMIN";
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

          {isAdmin && (
            <NavLink
              to="http://localhost:5173/Admin"
              className={({ isActive }) => (isActive ? 'admin-panel active' : 'admin-panel')}
              onClick={toggleMenu}
            >
              Panel Admin
            </NavLink>
          )}

          {logged() ? (
            <NavLink
              to={`${URL}/api/auth/logout`}
              className={({ isActive }) => (isActive ? 'logout active' : 'logout')}
              onClick={toggleMenu}
            >
              <div className="flex">
                <img src={user.picture} alt="Foto de perfil" />
                <div className="flex-name">
                  <p>{user.name}</p>
                  <div>Log Out</div>
                </div>
              </div>
            </NavLink>
          ) : (
            <NavLink
              to={`${URL}/api/auth/google`}
              className={({ isActive }) => (isActive ? 'login active' : 'login')}
              onClick={toggleMenu}
            >
              Log in
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
}
