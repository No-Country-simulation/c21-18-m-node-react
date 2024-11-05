import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as API from "../../services/apiUserServices";

export const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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


  return (
    <div style={appStyle}>
      <h1>Tabla de usuarios</h1>
      <TableContainer style={tableContainerStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre y Apellido</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
