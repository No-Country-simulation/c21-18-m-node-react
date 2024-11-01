import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import {
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Box,
  Container,
} from "@mui/material";
import * as API from "../../services/apiPetService";

export const PetForm = () => {
  const { id } = useParams();
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

  React.useEffect(() => {
    if (id) {
      API.getPet(id).then((pet) => {
        setFormData(pet.data);
      });
    }
  }, [id]);

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
      setFeedback({ message: "La edad solo puede ser números", type: "error" });
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

    const url = id
      ? `http://localhost:3000/api/pet/update-pet/${id}`
      : "http://localhost:3000/api/pet/create-pet";

    try {
      const response = await fetch(url, {
        method: id ? "PUT" : "POST", // Usa PUT para actualizar y POST para crear
        body: formDataToSend,
        credentials: "include",
      });

      if (response.ok) {
        setFeedback({
          message: id ? "Mascota actualizada" : "Mascota creada",
          type: "success",
        });
        if (!id) {
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
        }
      } else {
        const errorData = await response.json();
        setFeedback({
          message: errorData.message || "Error al crear/actualizar mascota",
          type: "error",
        });
      }
    } catch (error) {
      setFeedback({
        message: "Error al crear/actualizar mascota",
        type: "error",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        bgcolor: "#cdeac0",
        boxSizing: "content-box",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        gap: "10px",
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
        }}
      >
        <h1>{id ? "Editar Mascota" : "Crear Mascota"}</h1>
        <TextField
          name="name"
          label="Nombre"
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
          label="Descripción"
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
            Seleccionar Género
          </MenuItem>
          <MenuItem value="MACHO">Macho</MenuItem>
          <MenuItem value="HEMBRA">Hembra</MenuItem>
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
          label="Disponible para adopción"
        />
        <TextField name="picture" type="file" onChange={handleChange} />

        {feedback.message && (
          <Alert severity={feedback.type}>{feedback.message}</Alert>
        )}
      </Box>
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        onClick={handleSubmit}
        sx={{ backgroundColor: "#ffac81 ", color: "black" }}
      >
        {(id ? "Actualizar" : "Crear") + " Mascota"}
      </Button>
    </Container>
  );
};
