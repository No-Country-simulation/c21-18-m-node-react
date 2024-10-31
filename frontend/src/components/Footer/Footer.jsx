import React from "react";
import './Footer.css';
import Logo from '../../assets/paw-solid.svg'
import CopyrightIcon from '@mui/icons-material/Copyright';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <section className="social">
                    <h4>Links útiles</h4>
                    <div className="links">
                        <Link to="http://localhost:5173/AboutUs">Conócenos</Link>
                        <Link to="">Contacto</Link>
                    </div>
                </section>
                <section className="social">
                    <h4>Redes sociales</h4>
                    <div className="social-links">
                        <Link to="/"><InstagramIcon /></Link>
                        <Link to="/"><FacebookIcon /></Link>
                        <Link to="/"><XIcon /></Link>
                    </div>
                </section>
            </div>
            <section className="copyright">
                <CopyrightIcon style={{ fontSize: "small" }} />
                <p>Copyright 2024, C21-18-m. All rights reserved</p>
            </section>
            <section className="logo-footer">
                <img src={Logo} alt="Logo" />
            </section>
        </footer>
    )
}