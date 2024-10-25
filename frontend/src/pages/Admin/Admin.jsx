import { Navigate } from "react-router-dom";
import { Container, Button, Card } from "@mui/material";
import { Link } from "react-router-dom";

export const Admin = () => {
  return (
    <>
      <Container>
        <Card>
          <Button variant="contained" color="success">
            <Link to="/ShelterForm">Añadir Refugios</Link>
          </Button>
          <Button variant="contained" color="success">
            <Link to="/PetForm">Añadir Mascotas</Link>
          </Button>
        </Card>
      </Container>
    </>
  );
};
