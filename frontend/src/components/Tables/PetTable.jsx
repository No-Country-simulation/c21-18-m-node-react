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

  return (
    <TableContainer
      sx={{
        backgroundColor: "#efe9ae",
        borderRadius: "10px",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Edad</TableCell>
            <TableCell>Genero</TableCell>
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
                  color="primary"
                  component={Link}
                  to={`/api/pet/${pet.id}`}
                >
                  View
                </Button>
              </TableCell>
              <TableCell>
                <Switch
                  checked={pet.status}
                  onChange={() => API.togglePetStatus(pet.id)}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/api/pet/${pet.id}/edit`}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
