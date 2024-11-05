import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from "../../services/apiPetService";

export const PetTable = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await API.getAllPets();
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  const handleStatusChange = async (petId) => {
    try {
      const updatedStatus = await API.toggleStatus(petId);

      setPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === petId ? { ...pet, status: updatedStatus } : pet
        )
      );
    } catch (error) {
      console.error("Error updating pet status:", error);
    }
  };

  // Estilos en línea
  const appStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "60vh",
    padding: "20px",
  };

  const tableContainerStyle = {
    flex: 1,
    maxHeight: "60vh", 
    marginBottom: "20px",
  };


  const buttonStyle = {
    backgroundColor: "#cdeac0",
    color: "black",
    "&:hover": {
      backgroundColor: "#b0d4a5",
    },
  };

  return (
    <div style={appStyle}>
      <h1>Tabla de mascotas</h1>
      <TableContainer style={tableContainerStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Tamaño</TableCell>
              <TableCell>Vista</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>{pet.gender}</TableCell>
                <TableCell>{pet.size}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={buttonStyle}
                    component={Link}
                    to={`/api/pet/${pet.id}`}
                  >
                    Ver
                  </Button>
                </TableCell>
                <TableCell>
                  <Switch
                    color="primary"
                    checked={pet.status}
                    onChange={() => handleStatusChange(pet.id)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={buttonStyle}
                    component={Link}
                    to={`/petForm/${pet.id}`}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
