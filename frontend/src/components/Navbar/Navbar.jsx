import Paw from '../../assets/paw-solid.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
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
          <BurgerMenu></BurgerMenu>
        ) : (
          <div className="desktop-menu">
            <NavLink 
              to="/AllPets" 
              className={({ isActive }) => isActive ? "adopt active" : "adopt"}
            >
              Mascotas
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
