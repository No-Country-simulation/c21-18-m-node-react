import React from "react";
import './Banner.css';
import catBanner from '../../assets/cat2.jpg'

export default function Banner() {
    const data = {
        title:"Adopta a tu mascota ideal",
        slogan:"El mejor sitio para conocer a el nuevo integrante de tu familia",
    }
    const { image, title, slogan} = data;
    return (
        <section className="banner">
            <img src={catBanner} alt="" />
            <h1>{title}</h1>
            <h3>{slogan}</h3>
        </section>
    )
}