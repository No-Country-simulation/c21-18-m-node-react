import React from "react";
import Paw from "../../assets/paw-solid.svg";
import BurgerMenu from "../../assets/bars-solid.svg";
//import '../../../src/output.css'
import "./Navbar.css";

export default function Navbar() {
  return (
    /*         <div className="nav-container">
            <img className="logo" src={Paw} />
            <nav>
                <img className="burgerMenu" src={BurgerMenu} />
            </nav>
        </div> */
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Link</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
