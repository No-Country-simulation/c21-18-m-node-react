import React from "react";
import './Main.css';
import PetCard from "../PetCard/PetCard";
import { Link } from "react-router-dom";

export default function  Main() {
    return (
        <div className="main-container">
            <h3 className="subtitle"> Conocelos! </h3>
            <PetCard />
            <PetCard />
            <a href="/pets" className="btn"> Ver todos </a>
        </div>
    );
}