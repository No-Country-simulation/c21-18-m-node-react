import { Container, Button, Card, Icon } from "@mui/material";
import { Link } from "react-router-dom";

export const Admin = () => {
  return (
    <>
      <Container
        sx={{ display: "grid", flexDirection: "column", alignItems: "center" }}
      >
        <h1>Panel de administración</h1>
        <Card sx={{ display: "flex", flexDirection: "row" }}>
          <Button variant="contained" color="success">
            <Link to="/ShelterForm">Añadir Refugios</Link>
          </Button>
        </Card>

        <Card>
          <Button variant="contained" color="success">
            <Link to="/petForm">Añadir Mascotas</Link>
          </Button>
        </Card>

        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button variant="contained" color="success">
            <Link to="/PetTable">Mascotas</Link>
          </Button>
        </Card>
        <Card>
          <Button variant="contained" color="success">
            <Link to="/UserTable">Usuarios</Link>
          </Button>
        </Card>

        <Card>
          <Button variant="contained" color="success">
            <Link to="/ShelterTable">Refugios</Link>
          </Button>
        </Card>
      </Container>
    </>
  );
};
