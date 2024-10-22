import React from "react";
import './Footer.css';
import Logo from '../../assets/paw-solid.svg'

export default function Footer(){
    return(
        <footer>
            <section>
                <h4>Info</h4>
            </section>
            <section>
                <h4>Links útiles</h4>
            </section>
            <section>
                <p>copyright</p>
            </section>
            <section>
                <img src={Logo} alt="Logo" />
            </section>
        </footer>
    )
}