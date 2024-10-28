import { Container, Button, Card, Grid2 } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Link } from "react-router-dom";

export const Admin = () => {
  return (
    <>
      <Container>
        <h1>Panel de administración</h1>
        <Grid2>
          <Grid2>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button variant="contained" color="success">
                <PetsIcon />
                <Link to="/PetTable">Mascotas</Link>
              </Button>
            </Card>
          </Grid2>
          <Grid2>
            <Card>
              <Button variant="contained" color="success">
                <SupervisedUserCircleIcon />
                <Link to="/UserTable">Usuarios</Link>
              </Button>
            </Card>
          </Grid2>
          <Card>
            <Button variant="contained" color="success">
              <HomeIcon />
              <Link to="/ShelterTable">Refugios</Link>
            </Button>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              maxWidth: 200,
              minHeight: 200,
            }}
          >
            <Button variant="contained" color="success">
              <AddCircleIcon />
              <Link to="/ShelterForm">Añadir Refugios</Link>
            </Button>
          </Card>
          <Card
            sx={{
              display: "flex",
              maxWidth: 200,
              minHeight: 200,
            }}
          >
            <Button variant="contained" color="success">
              <AddCircleIcon />
              <Link to="/petForm">Añadir Mascotas</Link>
            </Button>
          </Card>
        </Grid2>
      </Container>
    </>
  );
};
