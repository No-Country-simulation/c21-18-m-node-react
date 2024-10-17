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
      <NavLink exact to="/" className="logo-link">
        <img className="logo" src={Paw} alt="Logo" />
      </NavLink>
      <nav>
        {isMobile ? (
          <img className="burgerMenu" src={BurgerMenu} alt="Menú de hamburguesa" />
        ) : (
          <div className="desktop-menu">
            <NavLink to="/detailPet" activeClassName="active" className="adopt">
              Adoptar
            </NavLink>
            <NavLink to="/AboutUs" activeClassName="active" className="contact">
              Conócenos
            </NavLink>
            <NavLink to="/LogIn" activeClassName="active" className="login">
              Log in
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}
