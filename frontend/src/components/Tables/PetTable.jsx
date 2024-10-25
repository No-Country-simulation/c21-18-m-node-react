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
import { PetForm } from "../Forms/PetForm";

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

      // Asegúrate de que el estado se actualiza correctamente
      setPets((prevPets) =>
        prevPets.map((pet) =>
          pet.id === petId ? { ...pet, status: updatedStatus } : pet
        )
      );
    } catch (error) {
      console.error("Error updating pet status:", error);
    }
  };

  return (
    <TableContainer>
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
                  onChange={() => handleStatusChange(pet.id)}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={() => <Link to={<PetForm pet={pet} />} />}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
