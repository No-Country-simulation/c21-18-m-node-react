import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as API from "../../services/apiShelterService";

export const ShelterTable = () => {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await API.getAllShelters();
        setShelters(response.data);
      } catch (error) {
        console.error("Error fetching shelters:", error);
      }
    };

    fetchShelters();
  }, []);

  return (
    <>
      <h1>Tabla de refugios</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shelters.map((shelter) => (
              <TableRow key={shelter.id}>
                <TableCell>{shelter.name}</TableCell>
                <TableCell>{shelter.address}</TableCell>
                <TableCell>{shelter.phone}</TableCell>
                <TableCell>
                  <Link to={`/ShelterForm/${shelter.id}`}>
                    <Button
                      sx={{ backgroundColor: "#cdeac0", color: "black" }}
                      variant="contained"
                      color="primary"
                      to={`/ShelterForm/${shelter.id}`}
                    >
                      Editar
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
