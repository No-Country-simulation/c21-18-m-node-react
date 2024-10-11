import React from "react";
import './Navbar.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import PetsIcon from '@mui/icons-material/Pets';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    return (
        <Container disableGutters>
            <Box disableGutters className="box" sx={{ bgcolor: '#ff928b', height: '7vh', width: '100%' }}>
                <PetsIcon />
                <MenuIcon />
            </Box>
        </Container>
    );
}