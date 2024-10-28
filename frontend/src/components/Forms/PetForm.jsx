import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import Container from "@mui/material/Container";
import {
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";

export const PetForm = () => {
  const userCredentials = Cookies.get("user");
  const [formData, setFormData] = React.useState({
    name: "",
    size: "",
    age: "",
    type: "",
    shelterId: "",
    description: "",
    gender: "",
    status: false,
    picture: null,
  });
  const [feedback, setFeedback] = React.useState({ message: "", type: "" });
  const [loading, setLoading] = React.useState(false);

  const validateForm = () => {
    const { name, age, type, shelterId, description } = formData;
    if (!name || !type || !age || !shelterId || !description) {
      setFeedback({
        message: "Todos los campos son requeridos",
        type: "error",
      });
      return false;
    }
    if (isNaN(age)) {
      setFeedback({ message: "La edad solo puede ser numeros", type: "error" });
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:3000/api/pet/create-pet", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
        userCredentials: userCredentials,
      });

      if (response.ok) {
        setFeedback({
          message: "Mascota creada",
          type: "success",
        });
        setFormData({
          name: "",
          size: "",
          age: "",
          type: "",
          shelterId: "",
          description: "",
          gender: "",
          status: false,
          picture: null,
        });
      } else {
        const errorData = await response.json();
        setFeedback({
          message: errorData.message || "Error al crear mascota",
          type: "error",
        });
      }
    } catch (error) {
      setFeedback({ message: "Error al crear mascota", type: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth=""
      sx={{
        display: "flex",
        flexDirection: "column",

        height: "80vh",
        width: "100%",

        bgcolor: "#cdeac0",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{
          padding: "10px",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",

          "& .MuiButton-root": {
            maxWidth: "80%",
          },
        }}
      >
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          name="age"
          label="Edad"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />
        <TextField
          name="type"
          label="Tipo (PERRO o GATO)"
          value={formData.type}
          onChange={handleChange}
        />
        <TextField
          name="shelterId"
          label="Id del refugio"
          type="number"
          value={formData.shelterId}
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Descripcion"
          multiline
          value={formData.description}
          onChange={handleChange}
        />
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Seleccionar Genero
          </MenuItem>
          <MenuItem value="MACHO">MACHO</MenuItem>
          <MenuItem value="HEMBRA">HEMBRA</MenuItem>
        </Select>
        <Select
          name="size"
          value={formData.size}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Seleccionar Tamaño
          </MenuItem>
          <MenuItem value="CHICO">Chico</MenuItem>
          <MenuItem value="MEDIANO">Mediano</MenuItem>
          <MenuItem value="GRANDE">Grande</MenuItem>
        </Select>

        <FormControlLabel
          control={
            <Checkbox
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
          }
          label="Disponible para adopcion"
        />
        <TextField name="picture" type="file" onChange={handleChange} />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          sx={{ mt: 2, alignSelf: "center", maxWidth: "80%" }}
        >
          Create Pet
        </Button>
        {feedback.message && (
          <Alert severity={feedback.type}>{feedback.message}</Alert>
        )}
      </Box>
    </Container>
  );
};
