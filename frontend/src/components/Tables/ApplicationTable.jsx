import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid2,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as API from "../../services/apiAplicationService";

export const ApplicationTable = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { applications } = await API.getAllApplications();
        setApplications(applications);
        console.log("applications:", applications[0]);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, newStatus, application) => {
    const {
      userId,
      petId,
      user: { email, name },
    } = application;
    const isApproved = newStatus === "APPROVED";

    try {
      const updatedStatus = await API.toggleStatus(applicationId, newStatus, {
        userId,
        petId,
        email,
        name,
        isApproved,
      });

      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === applicationId ? { ...app, status: updatedStatus } : app
        )
      );
    } catch (error) {
      console.error("Error en toggleStatus:", error);
    }
  };

  const appStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "58vh",
    padding: "20px",
  };

  const tableContainerStyle = {
    flex: 1,
    maxHeight: "60vh",
  };


  return (
    <div style={appStyle}>
      <TableContainer style={tableContainerStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Datos del Usuario</TableCell>
              <TableCell align="center">Mascota</TableCell>
              <TableCell align="center">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={`${application.id}-${application.status}`}>
                <TableCell>
                  <Grid2 container spacing={2} alignItems="center">
                    <Grid2 item xs={12} sm={4}>
                      <img
                        className="image"
                        src={application.user.picture}
                        alt="user image"
                      />
                    </Grid2>
                    <Grid2 item xs={12} sm={8}>
                      <div>
                        <p>
                          <strong>Nombre del usuario:</strong>
                          {application.user.name}
                        </p>
                        <p>
                          <strong>Solicitud para Mascota ID:</strong>
                          {application.petId}
                        </p>
                        <p>
                          <strong>Email del Solicitante:</strong>
                          {application.user.email}
                        </p>
                        <p>
                          <strong>¡Quiero adoptar a :</strong>
                          {application.pet.name}!
                        </p>
                      </div>
                    </Grid2>
                  </Grid2>
                </TableCell>

                <TableCell>
                  <Grid2
                    container
                    direction="column"
                    spacing={1}
                    alignItems="center"
                  >
                    <Grid2 item xs={12} sm={4}>
                      <img
                        className="image"
                        src={application.pet.picture}
                        alt="pet image"
                      />
                    </Grid2>
                    <Grid2 item xs={12}>
                      <div>{application.pet.name}</div>
                    </Grid2>
                  </Grid2>
                </TableCell>

                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel id={`status-select-label-${application.id}`}>
                      Estado
                    </InputLabel>
                    <Select
                      labelId={`status-select-label-${application.id}`}
                      id={`status-select-${application.id}`}
                      value={application.status}
                      onChange={(event) =>
                        handleStatusChange(
                          application.id,
                          event.target.value,
                          application
                        )
                      }
                      label="Estado"
                    >
                      <MenuItem value={"APPROVED"}>Aprobado</MenuItem>
                      <MenuItem value={"DENIED"}>Denegado</MenuItem>
                      <MenuItem value={"PENDING"}>Pendiente</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
