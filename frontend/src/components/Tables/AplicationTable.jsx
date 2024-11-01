import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as API from "../../services/apiAplicationService";

export const AplicationTable = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await API.getAllApplications();
        setApplications(response.applications);
        console.log("applications:", response.applications[0]);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const updatedStatus = await API.toggleStatus(applicationId, newStatus);

      // Actualizar el estado de la aplicación con el nuevo estado
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application.id === applicationId
            ? { ...application, status: updatedStatus }
            : application
        )
      );
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Mascota</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={`${application.id}-${application.status}`}>
              <TableCell>{application.user.name}</TableCell>
              <TableCell>{application.pet.name}</TableCell>
              <TableCell>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={application.status}
                  onChange={(event) =>
                    handleStatusChange(
                      application.petId,
                      application.id,
                      event.target.value
                    )
                  }
                  label="Status"
                >
                  <MenuItem value={"APPROVED"}>Aprobado</MenuItem>
                  <MenuItem value={"DENIED"}>Denegado</MenuItem>
                  <MenuItem value={"PENDING"}>Pendiente</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
