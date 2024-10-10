import React from "react";
import Paw from '../../assets/paw-solid.svg'
import BurgerMenu from '../../assets/bars-solid.svg'
import './Navbar.css'

export default function Navbar() {
    return (
        <div className="nav-container">
            <img className="logo" src={Paw} />
            <nav>
                <img className="burgerMenu" src={BurgerMenu} />
            </nav>
        </div>
    );
}