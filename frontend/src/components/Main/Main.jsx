import React from "react";
import './Main.css';
import PetCard from "../PetCard/PetCard";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function  Main() {
    return (
        <div className="main-container">
            <h3 className="subtitle"> Conocelos! </h3>
            <PetCard />
            <PetCard />
            <Button variant="contained" sx={{bgcolor:'#ffac81'}}>Ver todos</Button>
        </div>
    );
}