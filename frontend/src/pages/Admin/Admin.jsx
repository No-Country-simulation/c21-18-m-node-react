import { Container, Button, Card } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import './Admin.css';

import { Link } from "react-router-dom";

export const Admin = () => {
  return (
    <div className="admin-container">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <h1>Panel de administración</h1>

        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "400px",
                height: "100px",
                backgroundColor: "#cdeac0",
              }}
            >
              <AddTaskIcon style={{ color: "black" }} />
              <Link to="/AplicationTable" style={{ color: "black" }}>
                Gestionar Aplicaciones
              </Link>
            </Button>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "400px",
                height: "100px",
                marginLeft: "0",
                backgroundColor: "#cdeac0",
              }}
            >
              <PetsIcon style={{ color: "black" }} />
              <Link to="/PetTable" style={{ color: "black" }}>
                Mascotas
              </Link>
            </Button>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "400px",
                height: "100px",
                backgroundColor: "#cdeac0",
              }}
            >
              <SupervisedUserCircleIcon style={{ color: "black" }} />
              <Link to="/UserTable" style={{ color: "black" }}>
                Usuarios
              </Link>
            </Button>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "400px",
                height: "100px",
                backgroundColor: "#cdeac0",
              }}
            >
              <HomeIcon style={{ color: "black" }} />
              <Link to="/ShelterTable" style={{ color: "black" }}>
                Refugios
              </Link>
            </Button>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "400px",
                height: "100px",
                backgroundColor: "#cdeac0",
              }}
            >
              <AddCircleIcon style={{ color: "black" }} />
              <Link to="/ShelterForm" style={{ color: "black" }}>
                Añadir Refugios
              </Link>
            </Button>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "400px",
                height: "100px",
                backgroundColor: "#cdeac0",
              }}
            >
              <AddCircleIcon style={{ color: "black" }} />
              <Link to="/petForm" style={{ color: "black" }}>
                Añadir Mascotas
              </Link>
            </Button>
          </Card>
        </Container>
      </Container>
    </div>
  );
};
